// makes sure the user can only go to certain pages when they are logged in
export const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/login')
    }
}

// makes sure the user can only go to certain pages when they are logged out
export const ensureGuest = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        return next();
    }
}