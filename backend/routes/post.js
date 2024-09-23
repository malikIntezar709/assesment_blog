const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const verifyToken= require('../middleware/verifyToken');
const { validatePost, handleValidationErrors } = require('../validatores/validate');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', verifyToken, validatePost, handleValidationErrors, postController.createPost);
router.put('/:id', verifyToken, validatePost, handleValidationErrors, postController.updatePost);
router.delete('/:id', verifyToken, postController.deletePost);


module.exports = router;
