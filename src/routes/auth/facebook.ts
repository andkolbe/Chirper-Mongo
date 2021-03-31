import passport from 'passport';
import { Router } from 'express';

const router = Router();

router.get('/', passport.authenticate('facebook')) // we only want the scope of whatever is included in the profile

router.get('/callback',
    passport.authenticate('facebook', { failureRedirect: '/auth/login' }), // redirect back to the login page if this fails
    function (req, res) {
        // Successful authentication, redirect home
        res.redirect('/');
    });

export default router;