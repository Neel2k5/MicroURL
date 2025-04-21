const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    short:{
        type: String,
        required:true,
        unique:true,
    },
    long:{
        type: String,
        required:true,
    },
    clickCount:{
        type: Number,
        required:true,
    },
    

},{
    timestamps:true
});

const urlModel = mongoose.model("urlModel",urlSchema);

module.exports = urlModel;