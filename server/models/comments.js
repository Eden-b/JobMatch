const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const commentSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  commentText: { type: String, required: true, minlength: 2, maxlength: 255 },
  firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(Comment) {
  const schema = Joi.object({
    commentText: Joi.string().min(2).max(255).required(),
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
  });

  return schema.validate(Comment);
}

module.exports = { Comment, validateComment };
