const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.get('/logout', authController.logout);
router.post('/login', authController.login);
router.patch(
  '/updatePassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.post(
  '/forgotPassword',
  authController.isNotLoggedIn,
  authController.forgotPassword
);
router.patch(
  '/resetPassword/:token',
  authController.isNotLoggedIn,
  authController.resetPassword
);

module.exports = router;
