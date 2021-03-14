const router = require('express').Router();
const Joi = require('joi');
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({ success: false, message: 'Invalid email or password.' });
  const isPasswordValid = await bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!isPasswordValid)
    return res
      .status(400)
      .send({ success: false, message: 'Invalid email or password.' });

  res.status(200).json({
    token: user.GenerateAuthToken(),
    user: _.pick(user, ['email', 'firstName', 'lastName', 'role']),
  });
});

function validateLogin(obj) {
  const Schema = Joi.object({
    password: Joi.string().min(6).max(1024).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
      .min(6)
      .max(1024)
      .required(),
  });

  return Schema.validate(obj);
}

module.exports = router;
