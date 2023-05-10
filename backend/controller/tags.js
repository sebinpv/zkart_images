const express = require("express");
const path = require("path");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Tags = require("../model/tags.js");
const ErrorHandler = require("../utils/ErrorHandler");
const { isAdmin } = require("../middleware/auth");

// create Tags
router.post(
  "/create-tags",
  catchAsyncErrors(async (req, res, next) => {
    try {
        const tagsData = req.body;
        const tags = await Tags.create(tagsData);

        res.status(201).json({
          success: true,
          tags,
        });
      
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all tags
router.get(
    "/get-all-tags",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const tags = await Tags.find();
  
        res.status(201).json({
          success: true,
          tags,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

// delete a tags
router.delete(
  "/delete-tags/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const tagsId = req.params.id;

      const tags = await Tags.findByIdAndDelete(tagsId);

      if (!tags) {
        return next(new ErrorHandler("Tag not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Tag Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// edit tags
router.put(
  "/edit-tags/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
        const { id } = req.params;

        const { name } = req.body;

        const edittags = await Tags.findById(id);

        edittags.name = name;
        
        await edittags.save({ validateBeforeSave: false });

        res.status(201).json({
          success: true,
          edittags,
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get a tag
router.get(
  "/get-a-tag/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const singletag = await Tags.findById(req.params.id);

      res.status(201).json({
        success: true,
        singletag,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


module.exports = router;
