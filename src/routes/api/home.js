const { Router } =  require('express');
const Chirp =  require('../../db/models/Chirp');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const chirps = await Chirp.find()
            .populate('user') // this will bring in the data from the user model
            .sort({ createdAt: 'desc' })
            .lean() // use find() to get all chirps
        res.render('chirps/home', {
            chirps
        })

    } catch (error) {
        console.log(error);
        res.render('error/500') // can't use json object because we have no front end
    }
})

module.exports =  router;
