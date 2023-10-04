import * as dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../db/db.js";

const callbackURL = process.env['NODE_ENV'] === 'production' ? `${process.env['SERVER_URL']}/oauth2/redirect/google` : 'http://localhost:3005/oauth2/redirect/google';
export const googleStrategy = new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: callbackURL,
    scope: [ 'profile' ]
  }, async (accessToken, refreshToken, profile, done)=>{
    try {
      const user = await User.findOne({email: profile.emails[0].value});
      if (user) return done(null, user);
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: profile.id
      });
      return (null, newUser);
    } catch (error) {
      return done(error, null);
    }
});

export const serializeUser = (user, done)=>{
    done(null, user.id);
}

export const deserializeUser = async (id, done)=>{
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
}

