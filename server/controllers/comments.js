const { Card, validateCard } = require('../models/cards');
const { Comment, validateComment } = require('../models/comments');

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({});
    return res.status(200).send({ success: true, comments });
  } catch (err) {
    console.log(err);
  }
};
const createCardComments = async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error)
      return res.status(404).send({
        success: false,
        message: error.details[0].message,
      });
    const card = await Card.findById(req.params.cardId);
    if (!card)
      return res
        .status(404)
        .send({ success: false, message: 'card not found' });
    const comment = new Comment(req.body);
    await comment.save();
    card.comments.push(comment);
    await card.save();
    return res.status(200).send({ success: true, comment });
  } catch (err) {
    console.log(err);
  }
};
const getCardComments = async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId).populate('comments');
    if (!card)
      return res
        .status(404)
        .send({ success: false, message: 'card not found' });
    return res.status(200).send({ success: true, comments: card.comments });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getComments,
  createCardComments,
  getCardComments,
};
