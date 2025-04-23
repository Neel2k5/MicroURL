const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required:true,
        unique:true,
    },
    eMail:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required:true,
    },
    

},{
    timestamps:true
});

const userModel = mongoose.model("userModel",userSchema);

module.exports = userModel;