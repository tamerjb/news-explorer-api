const router = require('express').Router();
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
// const {
//   validateObjectId,
//   validateCardBody,
// } = require('../middleware/validation');

router.get('/articles', getAllArticles);
router.post('/articles', createArticle);
router.delete('/articles/articleId', deleteArticle);

module.exports = router;
