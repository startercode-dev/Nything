const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  await res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.topFivePopularForums = catchAsync(async (req, res, next) => {
  const topFive = await Post.aggregate([
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

  res.status(200).json({
    status: 'success',
    forums: topFive.length,
    data: {
      topFive,
    },
  });
});
