import express from 'express';
import User from '../models/User.js';
import {protect} from "../middleware/auth.js"
import jwt from "jsonwebtoken";

const router = express.Router(); // Create a new router instance for routes just for login , register and so on.
 
//Route to registrate user
router.post('/register',async (req, res) =>{
    const{username , email, password} = req.body; // structuring so client would fill sequence wise first username and then as it goes.avoid diff order
    
    try {
        if (!username || !email || !password) {
            return res.status(400).json({message:"Please fill all the fields"})
        }

        const userExist = await User.findOne({email});
        if (userExist){
            return res.status(400).json({message:"User already exists."})
        }

        const user = await User.create({username , email, password}) 
        const token = generateToken(user._id);

        return res.status(201).json({
            id:user._id,
            username:user.username,
            email:user.email,
            token
        })
    } catch (err) {
        res.status(500).json({message:err.message})
    }

})

// Login
router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email}); //user se create hua h so can be accessedby user. instead of User.
        if(!user || !(await user.matchPassword(password))){
           return res.status(401).json({message:'Invalid Credentials'})
        }
        const token = generateToken(user._id);
        res.json({
            id : user._id,
            username : user.username,
            email : user.email,
            token,
        })
    } catch (err) {
        // res.status(500).json({message:"Server Error"})
        console.log(err);
        res.status(500).json({message: err.message});
    }
}) 

//Me
router.get('/me', protect, async (req, res) => {
    res.status(200).json(req.user)

})

//Generate JWT
const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn:"30d"})
}


export default router;