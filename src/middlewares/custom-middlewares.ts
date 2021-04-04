const { clearHash } = require('./caching-middleware')

module.exports = {
    // makes sure the user can only go to certain pages when they are logged in
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/auth/login')
        }
    },

    // makes sure the user can only go to certain pages when they are logged out
    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/')
        } else {
            return next();
        }
    },
    cleanCache: async (req, res, next) => {
        try {
            await next();
            //@ts-ignore
            clearHash(req.user.id);
        } catch (error) {
            console.log(error)
        }
    }
}

