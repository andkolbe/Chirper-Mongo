import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import * as mongoose from 'mongoose';
import config from '../config';
import User from '../db/models/User';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
}) ;

passport.use(new GoogleStrategy.Strategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => { // use async await because we are dealing with mongoose
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value
    }

    // store user in db
    try {
        // find a user where the googleId = profile.id
        let user = await User.findOne({ googleId: profile.id })
        if (user) {
            done(null, user)
        } else { // if there is no user, create one
            user = await User.create(newUser);
            done(null, user)
        }
    } catch (err) {
        console.log(err);   
    }
}))
