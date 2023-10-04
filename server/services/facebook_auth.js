import * as dotenv from "dotenv"; dotenv.config();
import FacebookStrategy from "passport-facebook";
import { User } from "../db/db.js";
//oauth/facebook/redirect

const callbackURL = process.env.NODE_ENV === "production" ? `${process.env.SERVER_URL}/oauth/facebook/redirect` : "http://localhost:3005/oauth/facebook/redirect";
export const facebookStrategy = new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: callbackURL,
    profileFields: ['id', 'name', 'emails']
    },
    async function (accessToken, refreshToken, profile, cb){
        try {
            console.log(profile)
            const user = await User.findOne({email: profile.emails[0].value});
            if(user) return cb(null, user);
            const newUser = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: profile.id,
            });
            return cb(null, newUser);
        } catch (error) {
            return cb(error, null);
        }
    }
);
