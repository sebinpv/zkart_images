const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please enter Tag name!"],
    },
});

module.exports = mongoose.model("Tags", tagsSchema);