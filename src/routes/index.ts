export {}
const { Router } = require('express');
const apiRouter = require('./api');
const authRouter = require('./auth');

const router = Router();

router.use('/', apiRouter); 
router.use('/auth', authRouter); 


module.exports = router;
