const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter your Category name!"],
    },
    description:{
        type: String,
        required:[true,"Please enter your Category Description!"],
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model("Category", categorySchema);