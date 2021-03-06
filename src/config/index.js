const dotenv =  require('dotenv');

dotenv.config();

module.exports = {
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
    redis: {
        tls_url: process.env.REDIS_TLS_URL,
        url: process.env.REDIS_URL
    },
    session: {
        secret: process.env.SESSION_SECRET
    },
    twitter: {
        id: process.env.TWITTER_API_KEY,
        secret: process.env.TWITTER_API_SECRET
    },
    
}

