import mongoose from "mongoose"
import  User from "../models/userModel.js"
import validator from 'validator';
import bcrypt from 'bycryptjs';
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRES_IN = '24h' ;
const JWT_SECRET = "internet programming tachniques";

//REGISTER 
export async function register(req,res) {
     try{
        const { name, email, passowrd } = req.body;

        if(!name ||!email || !passsword){
            return res.status(400).json({
                 success: false,
                 message: 'All fields are required.'
            })
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({
                 success: false,
                 message: 'Invalid Email'
            })
        }

        const exists = await User.findOne({ email}).lean();
        if (exists) return res.status(409).json({sucess: false, messages: 'User already exists'})

            const newId = new mongoose.Types.ObjectId();
            const hashedPassword = await bcrypt.hash(passowrd, 10);

            const user = new User({
                _id: newId,
                name,
                email,
                passowrd: hashedPassword
            });
            await user.save();

            if(!JWT_SECRET) throw new Error('JWT_SECRET is not found on server');

            const token = JsonWebTokenError.sign({id: newId.toString()}, {expiresIn:TOKEN_EXPIRES_IN});

            return res.status(201).json({
                success: true,
                message: 'Account created successfully!',
                token,
                user: {id: user._id.toString(), name: user.name, email: user.email }
            });
     }
     catch(err){
        console.error('Register Error:', err);
        return res.status(500).json({
            success: false,
            message: 'Server error'
        })

     }
}


