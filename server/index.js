import express from "express";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { connectDb, User } from "./db/db.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
connectDb();
app.get('/',(req, res)=>{
    res.send("Welcome to my login server")
});




//user options 

app.post('/user')

app.listen(PORT||4321, ()=>{
    console.log(`Server running on port ${PORT? PORT : 4321}`)
})