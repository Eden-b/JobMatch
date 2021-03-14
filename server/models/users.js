const mongoose = require('mongoose');
const { Schema } = mongoose;
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 30 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 30 },
  password: { type: String, required: true, minlength: 6, maxlength: 1024 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 1024,
  },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  role: { type: String },
  createdAt: { type: Date, default: Date.now },
});

userSchema.method('GenerateAuthToken', function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.SECRET_KEY
  );
  return token;
});

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(30).alphanum().required(),
    lastName: Joi.string().min(2).max(30).alphanum().required(),
    email: Joi.string().email().min(6).max(1024).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
}

const User = mongoose.model('User', userSchema);

module.exports = { User, validateUser };
