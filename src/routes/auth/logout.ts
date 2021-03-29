import { Router } from 'express';
import { ensureAuth } from '../../middlewares/custom-middlewares';


const router = Router();

// you should only be able to go the logout route if you are logged in
router.get('/', ensureAuth, (req, res) => {
    // with passport, once we log in, we'll have a logout method on the request object
    req.logout();
    res.redirect('/')
})

export default router;
