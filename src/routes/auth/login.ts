import passport from 'passport';
import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'WHYYYYYYY', error: error.message });
    }
})

router.get('/google', passport.authenticate('google', { scope: ['profile'] })) // we only want the scope of whatever is included in the profile

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }), // redirect back to the login page if this fails
    function (req, res) {
        // Successful authentication, redirect home
        res.redirect('/');
    });

export default router;
