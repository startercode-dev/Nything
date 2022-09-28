const express = require('express');
const forumController = require('../controllers/forumController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(forumController.getAllForums)
  .post(authController.protect, forumController.createForum);

module.exports = router;
