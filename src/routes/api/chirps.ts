import { Router } from 'express';
import Chirp from '../../db/models/Chirps';

const router = Router();

// mongoose has built in methods. find, create, remove

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

router.post('/', async (req, res) => {
    try {
        const chirpDTO = req.body;
        const result = await Chirp.create(chirpDTO)
        res.json({ result, msg: 'chirp created!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'WHYYYYYYY', error: error.message });
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
