import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "./db/db.js";
dotenv.config();

//the request must be sended with a cookie that contains a jwt with the id encrypted
export function isAuthorized (req, res, next){
    //signed cookies are the ones that are encrypted
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({message: "Unauthorized user"});
    
    //verify the token obtained
    jwt.verify(token, process.env.JWT_SECRET, async function(err, id){
        if(err)return res.status(401).json({message: "Unauthorized user"});
        const user = await User.findById(id);
        req.user = user;
        next();
    })

}

export function isLogin (req, res, next){
    const token = req.signedCookies._iduser;
    if(!token) return res.status(401).json({message: "Unauthorized user"});
    
    jwt.verify(token, process.env.JWT_SECRET, async function(err, id){
        if(err)return res.status(401).json({message: "Unauthorized user"});
        next();
    })

}