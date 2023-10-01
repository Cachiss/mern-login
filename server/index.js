import express from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { connectDb, User } from "./db/db.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import { isAuthorized, isLogin } from "./middlewares.js";
import cors from "cors";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
//cookie parser needs a secret to send signed cookies
app.use(cookieParser("this is my secret"));
app.use(cors({
    origin: process.env.CLIENT_URL,
    //credentials option is used to allow cookies to be send from the client
    credentials: true,
}));
connectDb();
app.get('/',(req, res)=>{
    res.send("Welcome to my login server")
});

//functions
export const userExists = async(id)=>{
    return await User.findById(id)
}

//user endpoints

app.post('/user',async (req, res)=>{
    try {
        const {name, email, password} = req.body;
        await User.create({name, email, password});
        res.status(201).json("User created successfully")
    } catch (error) {
        res.status(500).json({message: "Server Error", error})
    }
});

app.post('/login',async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user)return res.status(401).json({message: "Invalid Credentials"});
        
        bcrypt.compare(password, user.password, function(err,result){
            if(result){
                //encrypt with HMAC SHA256
                const token = jwt.sign(user._id.toString(), process.env.JWT_SECRET);
                //set the cookie from the server instead of the client
                res.cookie("_iduser", token, {
                    signed: true,
                    httpOnly: true,
                    secure: true,
                });
                res.status(200).json({message: "Login successful"});
            }
            else{
                res.status(401).json({message: "Invalid credentials"});
            }
        });
    } catch (error) {
        res.status(500).json({message:"Server error"})
    }
});

app.get('/user',isAuthorized,(req, res)=>{
    const user = req.user;
    res.json({message: `Hi, ${user.name}`, user})
});

app.put('/user', isAuthorized, async (req,res)=>{
    try {
        const id = req.user._id;
        await User.findByIdAndUpdate(id,req.body)
        res.status(200).json({message:"User updated"})
    } catch (error) {
        res.status(500).json({message: "Server error"})
    }
})

app.delete('/user', isAuthorized, async (req, res)=>{
    try {
        const id = req.user._id;
        await User.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted"})

    } catch (error) {
        
    }
})
app.get('/auth', isLogin, (req, res)=>{
    res.status(200).json({message: "Authorized"})
})
app.listen(PORT||4321, ()=>{
    console.log(`Server running on port ${PORT? PORT : 4321}`)
})