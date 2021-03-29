import * as passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth20';
import * as mongoose from 'mongoose';
import config from '../config';
import User from '../db/models/Users';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new GoogleStrategy.Strategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: '/auth/google/callback'
},
async (accessToken, refreshToken, profile, done) => { // use async await because we are dealing with mongoose
    console.log(profile);
}))
