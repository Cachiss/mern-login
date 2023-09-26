import mongoose, { mongo } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
//connect db

export const connectDb = async()=>{
    try {
        mongoose.connect(MONGO_URL);
        console.log("DB connected")
    } catch (error) {
        console.log("Connection to DB failed. Maybe you don't configure your MongoDB Access correctly")
    }
}

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password: {
        String
    }
})

//encrypt password
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
});
export const User = mongoose.model('User', userSchema);
