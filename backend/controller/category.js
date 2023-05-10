const express = require("express");
const path = require("path");
const { isSeller, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Category = require("../model/category");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");

// create category
router.post(
  "/create-category",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const filename = req.file.filename;
      const fileUrl = path.join(filename);
      const categoryData = req.body;
      categoryData.image = fileUrl;

        const category = await Category.create(categoryData);

        res.status(201).json({
          success: true,
          category,
        });
      
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all category
router.get(
  "/get-all-category",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const category = await Category.find();

      res.status(201).json({
        success: true,
        category,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete a category
router.delete(
  "/delete-category/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const categoryId = req.params.id;

      const categoryData = await Category.findById(categoryId);

        const filename = categoryData.image;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });

      const category = await Category.findByIdAndDelete(categoryId);

      if (!category) {
        return next(new ErrorHandler("Category not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Category Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// edit category
router.put(
  "/edit-category/:id",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const filename = req.file.filename;
      const fileUrl = path.join(filename);

        const { name, description } = req.body;

        const editcategory = await Category.findById(id);

        editcategory.name = name;
        editcategory.image = fileUrl;
        editcategory.description = description;
        
        await editcategory.save({ validateBeforeSave: false });

        res.status(201).json({
          success: true,
          editcategory,
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get a category
router.get(
  "/get-a-category/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const singlecategory = await Category.findById(req.params.id);

      res.status(201).json({
        success: true,
        singlecategory,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
