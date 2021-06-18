const config = require('../config');

// use redis caching so we only have to call mongodb once to get this data and store it on our computer until the user leaves the session
const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util'); // this is a standard library that is included in node. Contains the promisify function

// const redisURL = 'redis://127.0.0.1:6379';
const redisURL = config.redis.url;
const client = redis.createClient(redisURL);
client.hget = util.promisify(client.hget) // promisify takes any function that accepts a callback as the last argument, and makes it instead return a promise

const exec = mongoose.Query.prototype.exec; // stores a reference to the original exec function

// storing information in redis is expensive, so we only want to cache certain queries in our project
mongoose.Query.prototype.cache = function (options) { // don't use an arrow function because we don't want to mess with the value of this   
        this.useCache = true;

        // any property passed into options will be the hash key
        // any key must be a number or string
        // if someone does not pass in a key, use '' to avoid undefined
        this.hashKey = JSON.stringify(options.key || '');
        return this; // allows us to chain .cache() onto function calls
}

mongoose.Query.prototype.exec = async function () { // don't use an arrow function because we don't want to mess with the value of this
    // Objects.assign is used to safely copy properties from one object to another
    // the first argument is the object that we are going to copy a bunch of properties to
    // we are going to take all of the results of getQuery, take all of the properties that are on there and assign them to the empty object
    // we then take the second object, and copy the collection property from it, onto the first object
    // we have to go through this extra step so we don't accidentally modify the object that is returned from getQuery, because that will modify getQuery itself
    try {

        // if useCache is true, run all the caching logic, if false, skip the caching logic and run exec function
        if (!this.useCache) {
            console.log("RESPONSE FROM MONGO")
            return exec.apply(this, arguments)
            // return await exec.apply(this, arguments)
        }

        // our key is an object but it needs to be a string (JSON) for redis to read it 
        const key = JSON.stringify({ ...this.getQuery()  // this is a reference to the current query that we are trying to execute
            
        });
    
        // see if we have a value for key in redis
        // hget is used to pull information out of a nested hash
        const cacheValue = await client.hget(this.hashKey, key); // we reach into redis and ask for whatever value is stored at key
    
        // if we do, return that
        if (cacheValue) {
            // the exec function expects us to return mongoose documents (model instances)
            // we have to take the JSON and turn it into a mongoose document
            const doc = (JSON.parse(cacheValue)) // this.model represents the model that the query is attached to (Chirp, User)

            // we are storing model instances (the current User we are fetching) and arrays of models (lists of chirps) inside of redis
            console.log('RESPONSE FROM REDIS')
            return Array.isArray(doc) // if doc is an array of records, this will return true
            ? doc.map(d => new this.model(d))
            : new this.model(doc); // if false, it means we are dealing with an object
        }
    
        // otherwise, issue the query and store the result in redis
        // this will wait for the query to be executed, and whatever comes back from mongodb will be assigned to result
        const result = await exec.apply(this, arguments); // code to run the original copy of exec. use apply so we can automatically pass in any arguments that are passed into exec as well
        // before we store result inside of redis, we need to turn it into JSON. redis only accepts json and the exec function by default outputs a mongoose document
        // hset is used to set information in a nested hash
        client.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 300) // set our cache to expire in 10 seconds
        console.log(result)
        return result;
    } catch (error) {
        console.log(error)
    }
}

module.exports =  {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey))
    }
}