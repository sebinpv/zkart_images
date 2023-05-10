const express = require("express");
const path = require("path");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const BCategory = require("../model/blogcategory");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAdmin } = require("../middleware/auth");

// create Blog Category
router.post(
  "/create-blogCategory",
  catchAsyncErrors(async (req, res, next) => {
    try {
        const blogCatData = req.body;
        const blogCat = await BCategory.create(blogCatData);

        res.status(201).json({
          success: true,
          blogCat,
        });
      
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all blog category
router.get(
    "/get-all-blogCategory",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const blogCats = await BCategory.find();
  
        res.status(201).json({
          success: true,
          blogCats,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

// delete a blogcategory
router.delete(
  "/delete-blogcategory/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogcategoryId = req.params.id;

      const blogcategory = await BCategory.findByIdAndDelete(blogcategoryId);

      if (!blogcategory) {
        return next(new ErrorHandler("Blog Category not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Blog Category Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// edit blogcategory
router.put(
  "/edit-blogcategory/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;

        const { name } = req.body;

        const editblogcategory = await BCategory.findById(id);

        editblogcategory.name = name;
        
        await editblogcategory.save({ validateBeforeSave: false });

        res.status(201).json({
          success: true,
          editblogcategory,
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get a category
router.get(
  "/get-a-blogcategory/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const singleblogcategory = await BCategory.findById(req.params.id);

      res.status(201).json({
        success: true,
        singleblogcategory,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


module.exports = router;
