const passport =  require('passport');
const { Router } =  require('express');

const router = Router();

router.get('/', passport.authenticate('facebook', { scope : ['email']})) // scope includes anything we have to ask the user permission for

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/login' }), // redirect back to the login page if this fails
    function (req, res) {
        // Successful authentication, redirect to dashboard
        res.redirect('/dashboard');
    });

module.exports = router;
