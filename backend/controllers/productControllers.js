
const Product  = require('../models/productModel');
const mongoose = require('mongoose');

//Get all Products:
const getAllProducts = async (req,res) => {
    const products = await Product.find({}).sort({createdAt:-1});
    res.status(200).json(products);
}

const createProd = async (req,res) => {
    const {title,about,author,img,price} = {...req.body};
    const new_prod = await Product.create({title,about,author,img,price});
    res.status(200).json(new_prod);
}

//Get Product:
const getProduct = async (req,res) => {
    const {id}     = req.params;
    const product  = await Product.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error:"The ID is Invalid!"})
    }
    if (!product){
        return res.status(404).json({error:"No Product found with the given ID!"});
    }
    res.status(200).json(product);
}

module.exports = {getAllProducts,getProduct,createProd};
