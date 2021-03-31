import { Router } from 'express';
import Chirp from '../../db/models/Chirp';
import { ensureAuth } from '../../middlewares/custom-middlewares';

const router = Router();

router.get('/', ensureAuth ,async (req: any, res) => {
    try {
        const chirps = await Chirp.find({ user: req.user.id })
            .populate('user') // this will bring in the data from the user model
            .sort({ createdAt: 'desc' })
            .lean() // use find() to get all chirps
        res.render('dashboard', {
            name: req.user.displayName,
            chirps
        })

    } catch (error) {
        console.log(error);
        res.render('error/500') // can't use json object because we have no front end
    }
})

export default router;