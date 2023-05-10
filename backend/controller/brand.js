const express = require("express");
const path = require("path");
const { isSeller, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Brand = require("../model/brand");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// create Brand
router.post(
  "/create-brand",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        const brandData = req.body;
        brandData.logo = fileUrl;

        const brand = await Brand.create(brandData);

        res.status(201).json({
          success: true,
          brand,
        });
      
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all brands
router.get(
    "/get-all-brands",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const brands = await Brand.find();
  
        res.status(201).json({
          success: true,
          brands,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

// delete a brand
router.delete(
  "/delete-brand/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const brandId = req.params.id;

      const brandData = await Brand.findById(brandId);

        const filename = brandData.image;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });

      const brand = await Brand.findByIdAndDelete(brandId);

      if (!brand) {
        return next(new ErrorHandler("Brand not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Brand Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// edit brand
router.put(
  "/edit-brand/:id",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const filename = req.file.filename;
      const fileUrl = path.join(filename);

        const { name } = req.body;

        const editbrand = await Brand.findById(id);

        editbrand.name = name;
        editbrand.logo = fileUrl;
        
        await editbrand.save({ validateBeforeSave: false });

        res.status(201).json({
          success: true,
          editbrand,
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get a brand
router.get(
  "/get-a-brand/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const singlebrand = await Brand.findById(req.params.id);

      res.status(201).json({
        success: true,
        singlebrand,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
