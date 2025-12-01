import bcrypt from "bcrypt";
import {userModel} from "../models/userModel.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

async function signupUser(req, res) {
    try {
        const { userEmail, userPassword, userFirstName, userLastName } = req.body;
        //now for input validation: we handled that using inputValidation middleware


        //checking for email duplicacy:
        const existingUser = await userModel.findOne({
            userEmail:userEmail
        })
        if (existingUser) {
            return res.status(400).json({ msg: "Email already registered" });
        }


        //now hashing using bcrypt:
        const hash = await bcrypt.hash(userPassword,10);
        const newUser = await userModel.create({
            userEmail,
            userPassword: hash,
            userFirstName,
            userLastName
        });

        res.status(201).json({
            msg: "User registered successfully",
            user: {
                userId: newUser._id,
                userEmail: newUser.userEmail,
                userName: `${newUser.userFirstName} ${newUser.userLastName}`
            }
        })

    } catch (err) {
        if (err.code == 11000) {  //MongoDB email duplicacy error code is 11000
            return res.status(400).json({msg:"Email already exists!"});
        }  //this duplicacy thing was checked here also to prevent any chances at all(like race-condtitons)

        console.log("Erros",err);
        return res.status(500).json({
            msg:"Server side error while signup",
            error:err.message
        })
    }
}

async function loginUser(req, res) {
    try{
    const {userEmail,userPassword}=req.body;

    //whether this guy is signed up or not
    const existingUser=await userModel.findOne({
        userEmail
    })
    if(!existingUser){
        return res.status(404).json({msg:"Email doesn't exists"});
    }
     

    //password verification
    const verified=await bcrypt.compare(userPassword,existingUser.userPassword);
    if(!verified){
        return res.status(401).json({msg:"Invalid Credentials"});
    }

    const token=jwt.sign({
        id:existingUser._id
    },process.env.SECRET_KEY,
    {
        expiresIn:"1h"
    }
    )

    res.status(200).json({
        msg:"Signin successful",
        token:token,
        email:existingUser.userEmail
    })

    }catch(err){
        console.log("Errors",err);
        return res.status(500).json({msg:"error while signup"});
    }
}


export { signupUser,loginUser };