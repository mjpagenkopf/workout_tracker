const router = require('express').Router();

router.use(require('./htmlRoutes'));
router.use('/api', require('./api'));

module.exports = router;