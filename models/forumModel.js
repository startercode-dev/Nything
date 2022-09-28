const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  forum: {
    type: String,
    required: [true, 'A forum must have title'],
  },
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = Forum;
