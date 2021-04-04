export { }
const { Router } = require('express');
const Chirp = require('../../db/models/Chirp');
const { ensureAuth } = require('../../middlewares/custom-middlewares');

const router = Router();

router.get('/', ensureAuth, async (req: any, res) => {
    try {
        const chirps = await Chirp.find({ user: req.user.id })
            .populate('user') // this will bring in the data from the user model. populate and lean work well together
            .sort({ createdAt: 'desc' })
            .lean() // writing lean after populate means lean will apply to both find and populate
            //@ts-ignore
            .cache({ key: req.user.id })

        res.render('dashboard', {
            name: req.user.displayName,
            chirps
        })
    } catch (error) {
        console.log(error);
        res.render('error/500') // can't use json object because we have no front end
    }
})

module.exports = router;

// ROUTE WITH REDIS
// router.get('/', ensureAuth, async (req: any, res) => {
//     try {
//         // use redis caching so we only have to call mongodb once to get this data and store it on our computer until the user leaves the session
//         const redis = require('redis');
//         const redisURL = 'redis://127.0.0.1:6379';
//         const client = redis.createClient(redisURL);
//         const util = require('util'); // this is a standard library that is included in node. Contains the promisify function
//         client.get = util.promisify(client.get) // promisify takes any function that accepts a callback as the last argument, and makes it instead return a promise

//         // Do we have any cached data in redis related to this query?
//         const cachedChirps = await client.get(req.user.id); // can use await because we promisified the callback

//         // If yes, then respond to the request right away and return
//         if (cachedChirps) {
//             console.log('SERVING FROM CACHE')
//             return res.render('dashboard', {
//                 name: req.user.displayName,
//                 chirps: (JSON.parse(cachedChirps))
//             });
//         }

//         // if no, we need to respond to request and update our cache to store the data

//         const chirps = await Chirp.find({ user: req.user.id })
//             .populate('user') // this will bring in the data from the user model. populate and lean work well together
//             .sort({ createdAt: 'desc' })
//             .lean() // writing lean after populate means lean will apply to both find and populate
//             console.log('SERVING FROM MONGODB')
//         res.render('dashboard', {
//             name: req.user.displayName,
//             chirps
//         })

//         client.set(req.user.id, JSON.stringify(chirps), 'EX', 300) // first argument: key we want to define, second argument: expiration timer in seconds, third argument: value we are trying to assign to it
//         // whenever we store objects inside of redis, we have to stringify them into JSON ahead of time
//         // chirps is an array of objects, where every object represents one individual chirp
//         // before we pass in chirps, we have to convert it to JSON
//         // we also have to remember to turn the cached chirps back into javascript with JSON.parse when we call it back

//     } catch (error) {
//         console.log(error);
//         res.render('error/500') // can't use json object because we have no front end
//     }
// })