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

router.get('/', async (req, res) => {
    try {
        const chirps = await Chirp.find() // use find() to get all chirps
        res.json(chirps);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'WHYYYYYYY', error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const chirp = await Chirp.findOne({ _id: req.params.id }) // use findOne() to get one chirp
        res.json(chirp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'WHYYYYYYY', error: error.message });
    }
})

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

router.put('/:id', async (req, res) => {
    try {
        const editedChirp = req.body;
        const result = await Chirp.findOneAndUpdate({ _id: req.params.id }, editedChirp);
        res.json({ result, msg: 'chirp updated!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'FFFFFFFFFF', error: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const result = await Chirp.remove({ _id: req.params.id })
        res.json({ result, msg: 'chirp deleted!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'this sucks', error: error.message })
    }
})



export default router;
