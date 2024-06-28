const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.SECRET_KEY;
const UserModel = require('../model/User.model');

const registrationHandler = async(req,res) => {
    const{userName,email,password,role,age} = req.body;
    try{
        bcrypt.hash(password,5, async(err,hash) => {
        if(err){
            res.status(500).json({message:"Error hashing password"});
        }
        else{
            const user = new UserModel({userName,email,password:hash,role,age});
            await user.save();
            res.status(200).send("User registered successfully")
        }
    })
    }catch(err){
        res.status(500).json({message:err.message});
    }
    
}

const loginHandler = async(req,res) => {
    const {email,password} = req.body;
    try{
    const user = await UserModel.findOne({email});
    if(user){
        bcrypt.compare(password, user.password, (err,result) => {
            if(err){
                res.status(500).json({message:"Error comparing password"});
            }else{
                if(result){
                    const token = jwt.sign({email, role : user.role, id : user._id, name : user.userName}, key);
                    res.status(200).send({"msg":"user logged in successfully", "token" : token});
                }
                else{
                    res.status(401).json({message:"Invalid password"});
                }
            }
        })
    }
    }catch(err){
        res.status(500).send(err);
    }

}

module.exports = {registrationHandler,loginHandler}
