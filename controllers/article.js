const Article = require('../models/article');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const BadRequestError = require('../utils/errors/BadRequestError');

const getAllArticles = (req, res, next) => {
  const owner = req.user._id;

  Article.find({ owner })
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};
//first review
const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const id = req.user._id;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }

      return next(err);
    });
};
const deleteArticle = (req, res, next) => {
  const { _id } = req.user;

  Article.findById(req.params.articleId)
    .orFail(new NotFoundError('article not found'))
    .then((article) => {
      if (article.owner.toString() !== _id) {
        return next(
          new ForbiddenError('Your Not Authorized to delete this article.')
        );
      }
      return Article.findByIdAndRemove(req.params.articleId).then(
        (deletedArticle) => res.status(200).send(deletedArticle)
      );
    })
    .catch(next);
};
module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
//first review
