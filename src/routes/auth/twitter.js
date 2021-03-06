const passport = require('passport');
const { Router } = require('express');

const router = Router();

router.get('/', passport.authenticate('twitter')) // we only want the scope of whatever is included in the profile

router.get('/callback',
    passport.authenticate('twitter', { failureRedirect: '/auth/login' }), // redirect back to the login page if this fails
    function (req, res) {
        // Successful authentication, redirect to dashboard
        res.redirect('/dashboard');
    });

    module.exports = router;
