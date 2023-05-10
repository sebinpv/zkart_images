const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller } = require("../middleware/auth");
const CoupounCode = require("../model/coupounCode");
const router = express.Router();

// create coupoun code
router.post(
  "/create-coupon-code",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCoupounCodeExists = await CoupounCode.find({
        name: req.body.name,
      });

      if (isCoupounCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupoun code already exists!", 400));
      }

      const coupounCode = await CoupounCode.create(req.body);

      res.status(201).json({
        success: true,
        coupounCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupons of a shop
router.get(
  "/get-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CoupounCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get coupon code value by its name
router.get(
  "/get-coupon-value/:name",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CoupounCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// edit coupon
router.put(
  "/edit-coupon/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;

        const { name, minAmount, maxAmount, selectedProduct, value } = req.body;

        const editcoupon = await CoupounCode.findById(id);

        editcoupon.name = name;
        editcoupon.minAmount = minAmount;
        editcoupon.maxAmount = maxAmount;
        editcoupon.selectedProduct = selectedProduct;
        editcoupon.value = value;
        
        await editcoupon.save({ validateBeforeSave: false });

        res.status(201).json({
          success: true,
          editcoupon,
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get a coupon
router.get(
  "/get-a-coupon/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const singlecoupon = await CoupounCode.findById(req.params.id);

      res.status(201).json({
        success: true,
        singlecoupon,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all coupon
router.get(
  "/get-all-coupon",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const coupons = await CoupounCode.find();

      res.status(201).json({
        success: true,
        coupons,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
