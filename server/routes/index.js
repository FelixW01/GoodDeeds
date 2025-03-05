const router = require('express').Router();

const apiRoutes = require('./api/api');


router.use('/api', apiRoutes);


module.exports = router;

