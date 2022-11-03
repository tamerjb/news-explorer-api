const router = require('express').Router();
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/article');
const {
  validateArticle,
  validateArticleId,
} = require('../middleware/validation');

router.get('/', getAllArticles);
router.post('/', validateArticle, createArticle);
router.delete('/articleId', validateArticleId, deleteArticle);

module.exports = router;
