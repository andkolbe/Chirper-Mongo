const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = () => {
    return new User({}).save();
}

/*
HOW JEST WORKS
It starts up a new Node environment from our command line
Jest then looks for all files inside of our project that end in .test.js
Jest then loads up that file and executes that file alone
None of our server code is executed in the same environment as our test code
If we try to get anything related to mongoose, we will get an error message, unless we require it inside of our test file
The same thing goes for our User file as well. It is not required or executed by our test suite
*/