const router = require('express').Router();
const {
  getUserArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article');
const {
  validateArticle,
  validateArticleId,
} = require('../middleware/validation');

router.get('/', getUserArticles);
router.post('/', validateArticle, createArticle);
router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;
// first review
