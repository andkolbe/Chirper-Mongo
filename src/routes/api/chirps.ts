import { Router } from 'express';
import Chirp from '../../db/models/Chirp';
import { ensureAuth } from '../../middlewares/custom-middlewares';

const router = Router();

// this endpoint will render the chirps/add view
router.get('/add', ensureAuth , async (req, res) => {
    try {
        res.render('chirps/add')
    } catch (error) {
        console.log(error);
        res.render('error/500');
}})

// this endpoint will render the chirps/edit/:id view
router.get('/edit/:id', ensureAuth , async (req, res) => {
    try {
        const chirp = await Chirp.findOne({ _id: req.params.id }).lean();
        if (!chirp) res.render('error/404'); // if that chirp doesn't exist, render the error page
        res.render('chirps/edit', { chirp })
    } catch (error) {
        console.log(error);
        res.render('error/500');
}})

router.post('/', ensureAuth, async (req: any, res) => {
    try {
        const chirpDTO = req.body;
        chirpDTO.user = req.user.id
        await Chirp.create(chirpDTO);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    const chirpDTO = req.body;
    try {
        let chirp = await Chirp.findById(req.params.id).lean();
        if (!chirp) res.render('error/404'); // if that chirp doesn't exist, render the error page
        chirp = await Chirp.findOneAndUpdate({ _id: req.params.id}, chirpDTO, {
            new: true, // will create a new chirp if it doesn't already exist
            runValidators: true // checks if mongoose fields are valid
        })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        const result = await Chirp.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
})



export default router;
