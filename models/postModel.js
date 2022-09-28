const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A post must have a title'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    paragraph: {
      type: String,
      required: [true, 'A post must have paragraphs'],
    },
    forum: {
      type: mongoose.Schema.ObjectId,
      ref: 'Forum',
      required: [true, 'A post must have a forum'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A post must have a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'firstName lastName',
  }).populate({
    path: 'forum',
    select: 'forum',
  });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
