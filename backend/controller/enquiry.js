const express = require("express");
const router = express.Router();
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Enquiry = require("../model/enquiry");
const { isAdmin } = require("../middleware/auth");


// create query
router.post(
  "/create-query",
  catchAsyncErrors(async (req, res, next) => {
    try {
        const queryData = req.body;

        const query = await Enquiry.create(queryData);

        res.status(201).json({
          success: true,
          query,
        });
      
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all enquiry
router.get(
    "/get-all-enquiry",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const enquiry = await Enquiry.find();
  
        res.status(201).json({
          success: true,
          enquiry,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

// update-enquiry
router.put(
    "/update-enquiry/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
          const { id } = req.params;
  
          const { status } = req.body;
  
          const enquiry = await Enquiry.findById(id);
  
          enquiry.status = status;
          
          await enquiry.save({ validateBeforeSave: false });
  
          res.status(201).json({
            success: true,
            enquiry,
          });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

  // delete a enquiry
router.delete(
  "/delete-enquiry/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const enquiryId = req.params.id;

      const enquiry = await Enquiry.findByIdAndDelete(enquiryId);

      if (!enquiry) {
        return next(new ErrorHandler("Enquiry not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Enquiry Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
