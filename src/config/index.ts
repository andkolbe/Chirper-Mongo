import * as dotenv from 'dotenv';

dotenv.config();

export default {
    mongoose: {
        uri: process.env.DB_URI
    },
    facebook: {
        id: process.env.FACEBOOK_APP_ID,
        secret: process.env.FACEBOOK_APP_SECRET
    },
    github: {
        id: process.env.GITHUB_CLIENT_ID,
        secret: process.env.GITHUB_CLIENT_SECRET
    },
    google: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET
    },
    session: {
        secret: process.env.SESSION_SECRET
    },
    twitter: {
        id: process.env.TWITTER_API_KEY,
        secret: process.env.TWITTER_API_SECRET
    },
    
}

export const { NODE_ENV = 'development' } = process.env;