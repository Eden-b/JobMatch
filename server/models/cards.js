const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');

const cardSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  position: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  image: {
    type: String,
    required: true,
  },
  title: { type: String, required: true, minlength: 10, maxlength: 100 },
  subject: { type: String, required: true, minlength: 10, maxlength: 1024 },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
});

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
  const schema = Joi.object({
    fullName: Joi.string().min(2).max(255).required(),
    position: Joi.string().min(2).max(255).required(),
    image: Joi.binary().encoding('base64'),
    title: Joi.string().min(10).max(100).required(),
    subject: Joi.string().min(10).max(1024).required(),
  });

  return schema.validate(card);
}

module.exports = { Card, validateCard };
