const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.setUser, authController.isLoggedIn);

router.get('/', viewController.getHome);
router.get('/signup', viewController.getSignupForm);
router.get('/login', viewController.getloginForm);
router.get('/post/create', authController.protect, viewController.createPost);
router.get(
  '/post/update/:id',
  authController.protect,
  viewController.updateMyPost
);
router.get('/post/me', authController.protect, viewController.getMyPost);
router.get('/post/:id', viewController.getPost);
router.get('/account/update', viewController.updateMyAccount);
router.get(
  '/forgotPassword',
  authController.isNotLoggedIn,
  viewController.forgetPassword
);
router.get(
  '/resetPassword/:token',
  authController.isNotLoggedIn,
  viewController.resetPassword
);

module.exports = router;
