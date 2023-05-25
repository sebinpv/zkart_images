const mongoose = require("mongoose");

var blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true,"Please enter Blog name!"],
    },
    description: {
      type: String,
      required: [true,"Please enter Blog Description!"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: [true,"Please slect a Blog Category!"],
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        //ref: "User",
        required: true,
    },
    image:
      {
        type: String,
        required: true,
      },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
