require('../db/models/User') // by requiring this file in, it will execute the contents of the file when Jest starts up, so mongoose will know what a user model is

const mongoose = require('mongoose')
const config = require('../config');

mongoose.Promise = global.Promise; // by default mongoose doesn't want to use its built in promise implementaion. We are telling it to use the Node global promise object
mongoose.connect(config.mongoose.uri, { useMongoClient: true }) // add on useMongoClient to avoid a deprecation warning


// Whenever jest starts up, it is going to try to load this file and execute this logic for every test that is ran inside of our test suite
// We should now be able to require mongoose into any of our test files and freely make use of it to access our database


