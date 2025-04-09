const jwt  = require('jsonwebtoken');
const User = require('../models/userModel');

// A Middleware function that adds user_id to the request object that the server recieves.
const requireAuth = async (req,res,next) => {
    const {authorization} = req.headers;
    if (!authorization){
        return res.status(401).json({error:"Autorization Token required"})
    }
    const token = authorization.split(' ')[1];
    try {
        const {_id} = jwt.verify(token,process.env.SEC);
        req.user    = await User.findOne({_id}).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error:'Request is not authorized!'});
    }
};
module.exports = requireAuth;