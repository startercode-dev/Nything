const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  comment: {
    type: String,
    required: [true, 'A comment can not be null'],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, 'A comment must be link to a post'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A comment must be made by a user'],
  },
});

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName',
  });
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
