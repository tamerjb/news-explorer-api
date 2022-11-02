const router = require('express').Router();
const {
  validateRegistration,
  validateAuth,
} = require('../middleware/validation');

const { registerUser, login } = require('../controllers/users');
const NotFoundError = require('../utils/errors/NotFoundError');
const auth = require('../middleware/auth');
const usersRoute = require('./users');
const articleRouter = require('./articles');

router.post('/signup', validateRegistration, registerUser);
router.post('/signin', validateAuth, login);

router.use(auth);

router.use('/users', usersRoute);
router.use('/articles', articleRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('The requested resource was not found'));
});

module.exports = router;
