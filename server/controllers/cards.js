const { Card, validateCard } = require('../models/cards');
const { Comment, validateComment } = require('../models/comments');
const { User } = require('../models/users');

const createCard = async (req, res) => {
  const DEFAULT_IMAGE =
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.searchpng.com%2Fwp-content%2Fuploads%2F2019%2F02%2FDeafult-Profile-Pitcher.png&f=1&nofb=1';

  const image = req.body.image || DEFAULT_IMAGE;
  try {
    if (!req.body.image) delete req.body.image;
    const { error } = validateCard(req.body);
    if (error)
      return res.send({
        success: false,
        message: error.details[0].message,
      });
    const card = new Card({
      ...req.body,
      image,
      user_id: req.user._id,
    });
    await card.save();

    const user = await User.findById(req.user._id);
    user.cards.push(card);
    user.save();
    res.status(200).send({
      success: true,
      message: 'Card created successfully',
      card,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllCards = async (req, res) => {
  try {
    const allCards = await Card.find({});
    res.status(200).json(allCards);
  } catch (err) {
    console.log(err);
  }
};

const getCardById = async (req, res) => {
  try {
    const card = await Card.findOne({
      _id: req.params.cardId,
    }).select('-__v');
    if (card)
      return res.status(200).send({
        success: true,
        card,
      });
    return res.status(404).send({
      success: false,
      message: 'Card not found.',
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteCardById = async (req, res) => {
  try {
    const card = await Card.deleteOne({
      _id: req.params.cardId,
      user_id: req.user._id,
    });

    if (card.deletedCount) {
      const user = await User.findById(req.user._id);
      user.cards = user.cards.filter((card) => card != req.params.cardId);
      await user.save();
      return res.status(200).send({
        success: true,
        message: 'Card successfully removed.',
      });
    }

    return res.status(404).send({
      success: false,
      message: 'Card not found.',
    });
  } catch (err) {
    console.log(err);
  }
};

const updateCard = async (req, res) => {
  const DEFAULT_IMAGE =
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pinclipart.com%2Fpicdir%2Fmiddle%2F157-1578186_user-profile-default-image-png-clipart.png&f=1&nofb=1';

  const image = req.body.image || DEFAULT_IMAGE;
  const query = {
    _id: req.params.cardId,
    user_id: req.user._id,
  };
  const update = { ...req.body, image, user_id: req.user._id };
  const options = { new: true };

  try {
    const { error } = validateCard(req.body);
    if (error)
      return res.send({
        success: false,
        message: error.details[0].message,
      });
    const card = await Card.findOneAndReplace(query, update, options);
    if (card)
      return res.status(200).send({
        success: true,
        card,
      });

    return res.status(404).send({
      success: false,
      message: 'Card not found',
    });
  } catch (err) {
    console.log(err);
  }
};
const editCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      req.body,
      { new: true }
    );
    if (updatedCard)
      return res.status(200).send({
        success: true,
        card: updatedCard,
      });

    return res.status(404).send({
      success: false,
      message: 'Card not found',
    });
  } catch (err) {
    console.log(err);
  }
};

const getUserCards = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id })
      .populate({ path: 'cards', select: '-__v' })
      .select('-password -__v');
    if (!user)
      return res.status(404).send({
        success: false,
        message: 'user not found.',
      });
    return res.status(200).send({
      success: true,
      cards: user.cards,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUserCardsFavorite = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id })
    .populate({ path: 'favorites', select: '-__v' })
    .select('-password -__v');
  if (!user)
    return res.status(404).send({
      success: false,
      message: 'user not found',
    });
  return res.status(200).send({
    success: true,
    favorites: user.favorites,
  });
};

const addCardToFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).send({
        success: false,
        message: 'user not found',
      });
    const card = await Card.findById(req.params.cardId);
    if (!card)
      return res.status(404).send({
        success: false,
        message: 'Card not found',
      });
    const isCardExist = user.favorites.find(
      (card) => card == req.params.cardId
    );
    if (isCardExist)
      return res.status(404).send({
        success: false,
        message: 'Card already added to favorite',
      });
    user.favorites.push(card);
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Card added successfully',
      card,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteCardFromFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const isCardExist = user.favorites.find(
      (card) => card == req.params.cardId
    );
    if (isCardExist) {
      user.favorites = user.favorites.filter(
        (card) => card != req.params.cardId
      );
      await user.save();
      return res.status(200).send({
        success: true,
        message: 'Card deleted successfully',
        card: isCardExist,
      });
    }
    return res.status(404).send({
      success: false,
      message: 'card not exist',
    });
  } catch (err) {
    console.log(err);
  }
};

const searchCard = async (req, res) => {
  try {
    const { q } = req.query;
    if (q === '')
      return res.status(200).send({
        success: true,
        cards: [],
      });
    const cards = await Card.find({
      $or: [
        { fullName: { $regex: `^${q}`, $options: 'i' } },
        { position: { $regex: `^${q}`, $options: 'i' } },
        { title: { $regex: `^${q}`, $options: 'i' } },
      ],
    });
    if (!cards)
      return res.status(404).send({
        success: false,
        message: 'cards not found',
      });
    res.status(200).send({
      success: true,
      cards,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createCard,
  getAllCards,
  getCardById,
  deleteCardById,
  updateCard,
  getUserCards,
  editCard,
  addCardToFavorite,
  deleteCardFromFavorite,
  getUserCardsFavorite,
  searchCard,
};
