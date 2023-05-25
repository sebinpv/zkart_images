const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isAuthenticated, isSeller, isAdmin } = require("../middleware/auth");
const Order = require("../model/order");
const Product = require("../model/product");
const Shop = require("../model/shop");
const sendMail = require("../utils/sendMail");

// create new order
router.post(
  "/create-order",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { cart, shippingAddress, user, totalPricee, paymentInfo, dPrice, discountShop, discountProd } = req.body;

      //   group cart items by shopId
      const shopItemsMap = new Map();

      for (const item of cart) {
        const shopId = item.shopId;
        if (!shopItemsMap.has(shopId)) {
          shopItemsMap.set(shopId, []);
        }
        shopItemsMap.get(shopId).push(item);
      }

      // create an order for each shop
      const orders = [];

      for (const [shopId, items] of shopItemsMap) {
        let totalPrice = 0;
        for (let index = 0; index < items.length; index++) {
          const ele = items[index].discountPrice * items[index].qty;
          if(items[index]._id === discountProd){
            totalPrice = totalPrice + ele - dPrice;
          } else {
            totalPrice = totalPrice + ele;
          }
          
        }
        const order = await Order.create({
          cart: items,
          shippingAddress,
          user,
          totalPrice,
          paymentInfo,
        });
        if (paymentInfo.status === "succeeded") {
            order.cart.forEach(async (o) => {
            await updateOrder(o._id, o.qty);
          });
          order.cart.forEach(async (or) => {
            await updateWallet(shopId,totalPrice);
          });
        }
        orders.push(order);
      }
      try {
        await sendMail({
          email: user.email,
          subject: "Zkart Order Successfull",
          message: `Hello ${user.name}, Thank you for your order. We'll send a confirmation when your order ships.`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        orders,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      };
      async function updateWallet(id, total) {
        const shop = await Shop.findById(id);

        shop.wallet += total;

        await shop.save({ validateBeforeSave: false });
      };
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of user
router.get(
  "/get-all-orders/:userId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({ "user._id": req.params.userId }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders of seller
router.get(
  "/get-seller-all-orders/:shopId",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all orders
router.get(
  "/get-all-orders", isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const orders = await Order.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update order status for seller
router.put(
  "/update-order-status/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }
      /*if (req.body.status === "Transferred to delivery partner") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }*/
      const user = order.user;
      const stat = req.body.status;
      order.status = req.body.status;

      if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "Succeeded";
      }

      await order.save({ validateBeforeSave: false });

      if(stat === "Shipping"){
        try {
          await sendMail({
            email: user.email,
            subject: "Zkart Order Dispatched",
            message: `Hello ${user.name}, We thought you'd like to know that we've dispatched your item(s). Your order is on the way.`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      else if(stat === "On the way"){
        try {
          await sendMail({
            email: user.email,
            subject: "Zkart Order Status",
            message: `Hello ${user.name}, Your package will be delivered between 7:00AM and 9:00PM by our Delivery Agent`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      else if(stat === "Delivered"){
        try {
          await sendMail({
            email: user.email,
            subject: "Zkart Order Delivered",
            message: `Hello ${user.name}, We have delivered your package, Please feel free to review the product. Hope you enjoy our service. Have a nice Day`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      res.status(200).json({
        success: true,
        order,
      });

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// give a refund ----- user
router.put(
  "/order-refund/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      order.status = req.body.status;

      const user = order.user;
      //const shopId = order.cart[0].shopId;
      //const amt = order.totalPrice;

      //const shop = await Shop.findById(shopId);
      //shop.wallet -= amt;
      
      //await shop.save({ validateBeforeSave: false });

      await order.save({ validateBeforeSave: false });

      try {
        await sendMail({
          email: user.email,
          subject: "Zkart Order Refund Request",
          message: `Hello ${user.name}, Your refund request is successfull !!!. The request is in process, we'll let you know the update... `,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(200).json({
        success: true,
        order,
        message: "Order Refund Request successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// accept the refund ---- seller
router.put(
  "/order-refund-success/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return next(new ErrorHandler("Order not found with this id", 400));
      }

      const user = order.user;
      const shopId = order.cart[0].shopId;
      const amt = order.totalPrice;

      const shop = await Shop.findById(shopId);
      shop.wallet -= amt;

      order.status = req.body.status;

      await order.save();
      
      await shop.save({ validateBeforeSave: false });
      

      try {
        await sendMail({
          email: user.email,
          subject: "Zkart Order Refund Status",
          message: `Hello ${user.name}, We have successfully processed your refund. It might take 3hr to 12hr to reflect in your bank account. Hope you enjoy our service. Have a nice Day`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(200).json({
        success: true,
        message: "Order Refund successfull!",
      });

      if (req.body.status === "Refund Success") {
        order.cart.forEach(async (o) => {
          await updateOrder(o._id, o.qty);
        });
      }

      async function updateOrder(id, qty) {
        const product = await Product.findById(id);

        product.stock += qty;
        product.sold_out -= qty;

        await product.save({ validateBeforeSave: false });
      };

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
