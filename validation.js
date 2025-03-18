// validation.js
const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('name').notEmpty().withMessage('Ім’я є обов’язковим'),
  body('email').isEmail().withMessage('Невірний формат email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль має бути не менше 6 символів')
];

const loginValidation = [
  body('email').isEmail().withMessage('Невірний формат email'),
  body('password').notEmpty().withMessage('Пароль є обов’язковим')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { registerValidation, loginValidation, validate };