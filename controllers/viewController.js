const catchAsync = require('../utils/catchAsync');
const Post = require('../models/postModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

exports.getHome = catchAsync(async (req, res, next) => {
  const topFiveAgg = await Post.aggregate([
    {
      $group: {
        _id: '$forum',
        numPost: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'forums',
        localField: '_id',
        foreignField: '_id',
        as: 'forums',
      },
    },
    {
      $sort: {
        numPost: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

  const topFiveForums = topFiveAgg.map((r) => r.forums[0].forum);

  // 2) GET post for populating to popular post
  const postFeatures = new APIFeatures(Post.find().populate('comments'), {
    sort: '-createdAt',
  })
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const popularPosts = await postFeatures.query;

  res.status(200).render('pages/index', {
    popularPosts,
    topFiveForums,
    page: 'Home',
    title: 'Nything Forum - Home',
  });
});

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render('pages/signup', {
    page: 'Signup',
    title: 'Nything Forum - Signup',
  });
});
exports.getloginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('pages/login', {
    page: 'Login',
    title: 'Nything Forum - Login',
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  res.status(200).render('pages/createPost', {
    page: 'Post-Create',
    title: 'Nything Forum - New Post',
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('comments');

  res.status(200).render('pages/post', {
    post,
    page: 'Get-Post',
    title: 'Nything Forum - Get Post',
  });
});

exports.getMyPost = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const postFeatures = new APIFeatures(Post.find({ user: userId }), {
    sort: '-createdAt',
    fields: 'title,user',
  })
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const myPosts = await postFeatures.query;

  res.status(200).render('pages/myPosts', {
    myPosts,
    page: 'My-Post',
    title: 'Nything Forum - My Post',
  });
});

exports.updateMyPost = catchAsync(async (req, res, next) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const post = await Post.findById(postId);

  if (post.user._id.toString() !== userId.toString()) {
    return next(new AppError('This user can not edit this post', 401));
  }

  res.status(200).render('pages/createPost', {
    post,
    page: 'Post-Update',
    title: 'Nything Forum - My Post',
  });
});

exports.updateMyAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('pages/myAccount', {
    page: 'Account-Update',
    title: 'Nything Forum - Update Account',
  });
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('pages/forgotPassword', {
    page: 'Forgot-Password',
    title: 'Nything Forum - Forgot Password',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('pages/resetPassword', {
    page: 'Reset-Password',
    title: 'Nything Forum - Reset Password',
  });
});
