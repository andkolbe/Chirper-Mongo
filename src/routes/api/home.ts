import { Router } from 'express';
import Chirp from '../../db/models/Chirp';

const router = Router();

router.get('/', async (req: any, res) => {
    try {
        const chirps = await Chirp.find().lean() // use find() to get all chirps
        res.render('home', {
            name: req.user.firstName,
            chirps 
        })
        
    } catch (error) {
        console.log(error);
        res.render('error/500') // can't use json object because we have no front end
    }
})

export default router;