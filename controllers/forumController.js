const Forum = require('../models/forumModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllForums = catchAsync(async (req, res, next) => {
  //Execute the query
  const features = new APIFeatures(Forum.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  // const doc = await features.query.explain(); // Explain shows the stats/perform on the request
  const doc = await features.query;

  await res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.createForum = catchAsync(async (req, res, next) => {
  const newForum = await Forum.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      forum: newForum,
    },
  });
});
