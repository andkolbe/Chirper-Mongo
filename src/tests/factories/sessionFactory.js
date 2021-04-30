// a factory is a function that creates and returns a common resource we might want to use throughout our test suite
const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const config = require('../../config')
const keygrip = new Keygrip([config.session.secret]);
module.exports = user => {
    const sessionObject = {
        passport: {
            user: user._id.toString() // the id field from mongoose is an object, so we have to turn it into a string
        }
    }
    const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64')

    const sig = keygrip.sign('session=' + session)

    return { session, sig }
}