const { Router } = require('express');
const chirpsRouter = require('./chirps');
const dashboardRouter = require('./dashboard');
const homeRouter = require('./home');

const router = Router();

router.use('/', homeRouter)
router.use('/chirps', chirpsRouter);  
router.use('/dashboard', dashboardRouter); 

module.exports = router;
