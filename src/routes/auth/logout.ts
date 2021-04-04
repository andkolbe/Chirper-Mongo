export {}
const { Router } = require('express');
const { ensureAuth } = require ('../../middlewares/custom-middlewares');

const router = Router();

// you should only be able to go the logout route if you are logged in
router.get('/', ensureAuth, (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  });

module.exports = router;
