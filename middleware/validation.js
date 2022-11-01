const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateUrl = (v, helpers) => {
  if (validator.isURL(v)) {
    return v;
  }
  return helpers.error('string.uri');
};
const validateRegistration = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Name must be at least 2 characters ',
        'string.max': 'Name must be at least 30 characters ',
        'any.required': 'Name is required',
      }),
    email: Joi.string().required().email().messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().min(8).messages({
      'string.min': 'Password must be at least 8 characters ',
      'any.required': 'Password is required',
    }),
  }),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .message('Valid email address is required')
      .messages({
        'string.required': 'Email is required',
        'string.email': 'Valid email address is required',
      }),
    password: Joi.string().required().min(8).messages({
      'string.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters ',
    }),
  }),
});
const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      'string.required': 'Keyword is required',
    }),
    title: Joi.string().required().messages({
      'string.required': 'Title is required',
    }),
    text: Joi.string().required().messages({
      'string.required': 'Text is required',
    }),
    date: Joi.string().required().messages({
      'string.required': 'Date is required',
    }),
    source: Joi.string().required().messages({
      'string.required': 'Source is required',
    }),
    link: Joi.string().required().custom(validateUrl).messages({
      'string.required': 'Link is required',
      'string.uri': 'Valid link required',
    }),
    image: Joi.string().required().custom(validateUrl).messages({
      'string.required': 'Image is required',
      'string.uri': 'Valid image required',
    }),
  }),
});
const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Invalid article ID');
      }),
  }),
});

module.exports = {
  validateRegistration,
  validateAuth,
  validateArticle,
  validateArticleId,
};
