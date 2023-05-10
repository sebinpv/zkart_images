const express = require("express");
const path = require("path");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Blog = require("../model/blog");
const ErrorHandler = require("../utils/ErrorHandler");
const { upload } = require("../multer");
const { isAdmin } = require("../middleware/auth");

// create category
router.post(
    "/create-blog",
    upload.single("file"),
    catchAsyncErrors(async (req, res, next) => {
      try {
        const filename = req.file.filename;
        const fileUrl = path.join(filename);
        const blogData = req.body;
        blogData.image = fileUrl;
  
          const blog = await Blog.create(blogData);
  
          res.status(201).json({
            success: true,
            blog,
          });
        
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

// get all blogs
router.get(
    "/get-all-blogs",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const blogs = await Blog.find().populate("author").populate("category");
  
        res.status(201).json({
          success: true,
          blogs,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

// get filter blogs
router.get(
  "/get-all-fblogs",
  catchAsyncErrors(async (req, res, next) => {
    try {
      // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Blog.find(JSON.parse(queryStr)).populate("category").populate("author");

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const blogCount = await Blog.countDocuments();
      if (skip >= blogCount) throw new Error("This Page does not exists");
    }
    const blogs = await query;

      res.status(201).json({
        success: true,
        blogs,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

  // get a blog
router.get(
  "/get-blog/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blog = await Blog.findById(req.params.id);

      res.status(201).json({
        success: true,
        blog,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete a blog
router.delete(
  "/delete-blog/:id",
  isAdmin,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const blogId = req.params.id;

      const blogData = await Blog.findById(blogId);

        const filename = blogData.image;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
          }
        });

      const blog = await Blog.findByIdAndDelete(blogId);

      if (!blog) {
        return next(new ErrorHandler("Blog not found with this id!", 500));
      }

      res.status(201).json({
        success: true,
        message: "Blog Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// edit blog
router.put(
  "/edit-blog/:id",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const filename = req.file.filename;
      const fileUrl = path.join(filename);

        const { name, category, description } = req.body;

        const editblog = await Blog.findById(id);

        editblog.name = name;
        editblog.image = fileUrl;
        editblog.category = category;
        editblog.description = description
        
        await editblog.save({ validateBeforeSave: false });

        res.status(201).json({
          success: true,
          editblog,
        });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

  // get user blog
  router.get(
    "/get-user-blog/:id",
    catchAsyncErrors(async (req, res, next) => {
      try {
        const userblog = await Blog.find({author: req.params.id}).populate("author").populate("category");
  
        res.status(201).json({
          success: true,
          userblog,
        });
      } catch (error) {
        return next(new ErrorHandler(error, 400));
      }
    })
  );

module.exports = router;
