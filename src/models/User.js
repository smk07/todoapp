const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

UserSchema.pre('save',function(next){
    const user= this;

    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err);
        
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err);

            user.password=hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword= function(password){
    const user=this;

    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err) return reject(false);

            if(!isMatch) return reject(false);

            return resolve(true);
        });
    });
};

mongoose.model('User',UserSchema);