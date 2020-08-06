const mongoose = require('mongoose');
const express= require('express');
const User = mongoose.model('User');
const jwt= require('jsonwebtoken');
const SECRET_KEY = "ITHUDAN VIDAI PERUVADHU UNGAL NAAN";

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    // console.log(authorization);
    if(!authorization){
        return res.status(403).json({error:"You must be logged in!"});
    }
    const token = authorization.replace('Bearer ','');
    jwt.verify(token,SECRET_KEY,async (err,payload)=>{
        if(err){
            console.log(err);
            return res.status(403).json({error:"You must logged in!"});
        }
        
        const {userId} = payload;
        const user = await User.findById(userId).exec();
        req.user = user;
        next();
    });
};