const { User, validateUser } = require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.send({
        success: false,
        message: error.details[0].message,
      });

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send({
        success: false,
        message: 'User already registered.',
      });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    user = new User({ ...req.body, password: hash, role: 'user' });
    await user.save();

    return res.status(200).send({
      success: true,
      user: _.pick(user, ['_id', 'firstName', 'lastName', 'email']),
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role != 'admin')
      return res
        .status(403)
        .send({ success: false, message: 'admin permission are required.' });
    let users = await User.find({});

    if (!users.length)
      return res
        .status(404)
        .send({ success: false, message: 'there is no users registered yet.' });

    users = users.map((user) =>
      _.pick(user, ['_id', 'firstName', 'lastName', 'email', 'cards'])
    );
    res.status(200).send({ success: true, users });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createUser, getAllUsers };
