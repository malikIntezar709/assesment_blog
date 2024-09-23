const { check, validationResult } = require('express-validator');


const validateUserRegistration = [
  check('username', 'Username is required').notEmpty(),
  check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
  check('role', 'Role must be either user or admin').optional().isIn(['user', 'admin']),
];

const validatePost = [
    check('title', 'Title is required').notEmpty(),
    check('content', 'Content is required').notEmpty(),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUserRegistration,
  validatePost,
  handleValidationErrors,
};
