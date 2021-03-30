import { Router } from 'express';
import { ensureGuest } from '../../middlewares/custom-middlewares';

const router = Router();

// you should only be able to go the login route if you are logged out
router.get('/', ensureGuest, (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error);
        res.render('error/500'); }
})

export default router;
