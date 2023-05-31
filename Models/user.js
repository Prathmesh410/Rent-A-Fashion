const mongoose = require('mongoose');
const crypto = require('crypto');
const  uuidv4  = require('uuid/v4');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 40,
    trim: true
  },
  lastname: {
    type: String,
    required: false,
    maxlength: 40,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  encry_password: {
    type: String,
    required: true
  },
  salt: String,
  role: {
    type: String,
    enum: ['lender', 'borrower','admin'],
    default: 'lender'
  },
  rented_products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    rentedAt: {
      type: Date,
      default: Date.now
    },
    returnedAt: Date
  }],
  added_products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  address: {
    street: {
      type: String,
      maxlength: 100
    },
    city: {
      type: String,
      maxlength: 50
    },
    state: {
      type: String,
      maxlength: 50
    },
    postalCode: {
      type: String,
      maxlength: 10
    },
    country: {
      type: String,
      maxlength: 50
    }
  }
}, {
  timestamps: true
});


userSchema.virtual("password")
    .set(function(password){
        this._password = password;
        this.salt =  uuidv4;
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this.password;
    })



    userSchema.methods = {
        authetication : function(plainpassword){
            return this.securePassword(plainpassword) === this.encry_password
        },

        securePassword :function(plainpassword){
            if(!plainpassword) return "";
            try{
                return crypto
                .createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex'); 
            }catch (err) {
                return "";
            }
        }
    }

module.exports = mongoose.model('User', userSchema);