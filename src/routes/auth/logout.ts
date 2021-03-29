import passport from 'passport';
import { Router } from 'express';

const router = Router();

router.get('/logout', (req, res) => {
    // with passport, once we log in, we'll have a logout method on the request object
    req.logout();
    res.redirect('/')
})

export default router;
