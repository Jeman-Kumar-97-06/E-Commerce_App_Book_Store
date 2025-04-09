const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const productSchema = new Schema({
    title    : {type:String,required:true},
    about    : {type:String,required:true},
    author   : {type:String,required:true},
    img      : {type:String,required:true},
    price    : {type:String,required:true},
    category : {type:String,required:true}
});

module.exports = mongoose.model('Product',productSchema);