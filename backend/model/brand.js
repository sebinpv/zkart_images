const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required:[true,"Please enter your Brand name!"],
    },
    logo:{
        type: String,
    },
});

module.exports = mongoose.model("Brand", brandSchema);