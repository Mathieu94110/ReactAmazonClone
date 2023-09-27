const router = require('express').Router();
const apiUsers = require('./users');
const apiAuth = require('./auth');
const apiProducts = require('./products')

router.use('/users', apiUsers);
router.use('/auth',apiAuth);
router.use('/products',apiProducts)
module.exports = router