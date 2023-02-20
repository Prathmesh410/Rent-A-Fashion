const mongoose = require ("mongoose"); 
const {ObjectId} = mongoose.Schema ;

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true,
        maxlength : 50

    },
    description : {
        type : String,
        trim : true,
        required : true,
        maxlength : 500

    },
   
    category : {
        type : ObjectId,
        ref : "Category",
        required : true,
    },
    rent : {
        type : Number,
    },
    units:{
        type : Number,
        default :0 
    },
    photo : {
         data : Buffer,
         contentType : String
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
      },
      renter : {
        type : String,
        trim : true,
        required : true,
        maxlength : 500

    },
    Pickup: {
        type : String,
        trim : true,
        required : true,
        maxlength : 500

    },
    review : {
        type : ObjectId,
        ref : "Review",
    },

},
{timestamps : true}
);

module.exports = mongoose.model("Product" , productSchema);