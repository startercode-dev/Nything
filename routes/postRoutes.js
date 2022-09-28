const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentRouter = require('./commentRoutes');

const router = express.Router();

router.use('/:postId/comments', commentRouter);

router
  .route('/')
  .get(postController.getAllPosts)
  .post(authController.protect, postController.createPost);

router
  .route('/top-five-popular-forums')
  .get(postController.topFivePopularForums);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(authController.protect, postController.updatePost)
  .delete(
    authController.protect,
    // authController.restrictTo('admin'),
    postController.deletePost
  );

module.exports = router;
