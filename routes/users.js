const router = require('express').Router();
const { getCurrentUser } = require('../controllers/newsusers');

router.get('/me', getCurrentUser);

module.exports = router;
// first review
