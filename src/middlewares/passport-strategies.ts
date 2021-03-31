import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import TwitterStrategy from 'passport-twitter';
import config from '../config';
import User from '../db/models/User';

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});

// Google Strategy
passport.use(new GoogleStrategy.Strategy({
    clientID: config.google.id,
    clientSecret: config.google.secret,
    callbackURL: '/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => { // use async await because we are dealing with mongoose
        const newUser = {
            displayName: profile.displayName,
            image: profile.photos[0].value,
            email: profile.emails[0].value
        }

        // store user in db
        try {
            // if the email on this account already exists in the db, don't create a new user
            let user = await User.findOne({ email: profile.emails[0].value })
            if (user) {
                done(null, user)
            } else { // if there is no user, create one
                user = await User.create(newUser);
                done(null, user)
            }
        } catch (err) {
            console.log(err);
        }
    }
));

// Facebook Strategy
passport.use(new FacebookStrategy.Strategy({
    clientID: config.facebook.id as string,
    clientSecret: config.facebook.secret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['displayName', 'emails', 'photos'] // must add these for facebook oauth 
},
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            displayName: profile.displayName,
            image: profile.photos[0].value,
            email: profile.emails[0].value
        }
        // store user in db
        try {
            // if the email on this account already exists in the db, don't create a new user
            let user = await User.findOne({ email: profile.emails[0].value })
            if (user) {
                done(null, user)
            } else { // if there is no user, create one
                user = await User.create(newUser);
                done(null, user)
            }
        } catch (err) {
            console.log(err);
        }
    }
));

// Twitter Strategy
passport.use(new TwitterStrategy.Strategy({
    consumerKey: config.twitter.id,
    consumerSecret: config.twitter.secret,
    callbackURL: 'auth/twitter/callback', // remember to change callback and website on the twitter developer portal once deployed!!!!!!!!!!!!!!!
    includeEmail: true
},
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            displayName: profile.displayName,
            image: profile.photos[0].value,
            email: profile.emails[0].value
        }
        // store user in db
        try {
            // if the email on this account already exists in the db, don't create a new user
            let user = await User.findOne({ email: profile.emails[0].value })
            if (user) {
                done(null, user)
            } else { // if there is no user, create one
                user = await User.create(newUser);
                done(null, user)
            }
        } catch (err) {
            console.log(err);
        }
    }
));


