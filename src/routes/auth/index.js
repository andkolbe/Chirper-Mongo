const { Router } = require('express');
const facebookRouter = require('./facebook');
const googleRouter = require('./google');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const twitterRouter = require('./twitter');

const router = Router();

router.use('/facebook', facebookRouter);
router.use('/google', googleRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/twitter', twitterRouter);

module.exports = router;
