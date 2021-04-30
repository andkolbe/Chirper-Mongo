const { Router } = require('express');
const Chirp = require('../../db/models/Chirp');
const { cleanCache , ensureAuth } = require('../../middlewares/custom-middlewares');


const router = Router();

// this endpoint will render the chirps/add view
router.get('/add', ensureAuth, async (req, res) => {
    try {
        res.render('chirps/add')
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
})

// this endpoint will render the chirps/edit/:id view
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
        const chirp = await Chirp.findOne({ _id: req.params.id }).lean(); // use lean with GET requests
        // lean is good to use when you execute a query and want to get the results quickly without modifying them
        if (!chirp) res.render('error/404'); // if that chirp doesn't exist, render the error page
        res.render('chirps/edit', { chirp })
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }})

router.post('/', ensureAuth, cleanCache, async (req, res) => {
    try {
        const chirpDTO = req.body;
        chirpDTO.user = req.user.id
        await Chirp.create(chirpDTO);
        res.redirect('/dashboard');
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
        chirp = await Chirp.findOneAndUpdate({ _id: req.params.id }, chirpDTO, {
            new: true, // returns the new modified chirp instead of the original
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
        await Chirp.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
        res.render('error/500');
    }
})

module.exports =  router;

/*
Three ways to execute a mongoDB query

query.exec((err, result) => console.log(result))

query.then(result => console.log(result))
.then behind the scenes also calls .exec and causes the query to be executed

const result = await query;
async/await
*/
