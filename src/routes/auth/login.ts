import * as passport from 'passport';
import { Router } from 'express';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] })) // we only want the scope of whatever is included in the profile

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }), // redirect back to the login page if this fails
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });





export default router;
