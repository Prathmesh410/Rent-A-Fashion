const mongoose = require('mongoose');

  var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 40,
        trim : true,
    },

    lastname : {
        type : String,
        required : false,
        maxlength : 40,
        trim : true,
    },

    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    
    encry_password : {
         type : String,
         required : true,
    },


    salt : String,

    role : {
        type : Number,
        default : 0,

    },
    purchases : {
        type : Array,
        default : []
    }
    ,
    added_products : {
        type : Array,
        default : []
    }
     
    
}, {timestamps : true});


module.exports = mongoose.model("User",userSchema)