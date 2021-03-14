import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import { Avatar } from '@material-ui/core';
import CardMenuOptions from './cardMenuOptions';
import { Link } from 'react-router-dom';
import { getCardCommentsAction } from '../redux/comments/commentActions';
import {
  AddUserFavoriteCardAction,
  deleteUserFavoriteCardAction,
} from '../redux/card/cardActions';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import AlertModal from './Modals/alertModal';
import TodayIcon from '@material-ui/icons/Today';
import moment from 'moment';
const useStyles = makeStyles(() => ({
  card: {
    maxWidth: 280,
    background: '#212121',
    borderRadius: 8,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    margin: '0 auto',
  },
  avatar: {
    height: 65,
    width: 65,
    borderRadius: '50%',
    marginBottom: 20,
  },
  name: {
    fontWeight: 400,
    color: 'white',
  },
  position: {
    lineHeight: 1,
    fontWeight: 400,
    color: '#94908b',
    marginBottom: 25,
  },
  buttonIconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButtonStyle: {
    background: '#9c9c9c',
    borderRadius: '30%',
    width: 30,
    height: 30,
    marginRight: 10,
    border: 0,
    display: 'grid',
    placeContent: 'center',
    outline: 'none',
    transition: '0.3s',
    '&:hover': {
      background: '#5f5f5f',
    },
  },
  iconStyle: {
    color: 'black',
    height: 18,
  },
  buttonP: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonComments: {
    fontSize: 10,
    color: '#94908b',
  },
  readMore: {
    color: '#94908b',
    paddingTop: 20,
    fontSize: 12,
    textDecoration: 'none',
    ':link': {
      textDecoration: 'underline',
    },
    ':hover': {
      textDecoration: 'none',
    },
  },
  description: {
    fontSize: 14,
    fontWeight: 300,
    marginTop: 20,
    color: 'white',
    lineHeight: 1.5,
    textAlign: 'center',
    wordBreak: 'break-word',
  },
}));
export default function Card({ card, isMenu = false, favorite, isFav }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [alertModal, setAlertModal] = useState(false);
  function addToFavoriteToggle() {
    if (!isAuthenticated) return setAlertModal(true);
    if (!isFav) return dispatch(AddUserFavoriteCardAction(card._id));
    return dispatch(deleteUserFavoriteCardAction(card._id));
  }

  function charLimit(string, charNum = 20) {
    string.trim();
    let newString = string.slice(0, charNum) + '...';
    return newString;
  }
  return (
    <div className={classes.card}>
      <div
        style={{
          position: 'absolute',
          margin: '20px 0',
          top: 0,
          right: 0,
        }}
      >
        {isMenu && <CardMenuOptions cardId={card._id} />}
      </div>
      {favorite && (
        <IconButton
          onClick={addToFavoriteToggle}
          aria-label="delete"
          style={{
            position: 'absolute',
            margin: 0,
            top: 0,
            right: 0,
            color: '#aaaa48',
          }}
        >
          {isFav ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      )}
      <Avatar src={card.image} size="" className={classes.avatar} />
      <AlertModal isAlertModal={alertModal} setAlertModal={setAlertModal} />
      <h3 className={classes.name}>{card.fullName}</h3>
      <h5 className={classes.position}>{card.position}</h5>
      <div style={{ display: 'flex' }}>
        <div
          style={{ marginRight: 15 }}
          className={classes.buttonIconContainer}
        >
          <button className={classes.iconButtonStyle}>
            <ChatOutlinedIcon className={classes.iconStyle} />
          </button>

          <div>
            <p className={classes.buttonP}>{card.comments.length}</p>
            <p className={classes.buttonComments}>Comments</p>
          </div>
        </div>
        <div>
          <div className={classes.buttonIconContainer}>
            <button className={classes.iconButtonStyle}>
              <TodayIcon className={classes.iconStyle} />
            </button>

            <div>
              <p className={classes.buttonP}>
                {moment(card.createdAt).format('DD.M.YY')}
              </p>
              <p className={classes.buttonComments}>created</p>
            </div>
          </div>
        </div>
      </div>
      <p className={classes.description}>{charLimit(card.title)}</p>
      <Link
        onClick={() => dispatch(getCardCommentsAction(card._id))}
        to={`/cards/${card._id}/read-more`}
        className={classes.readMore}
      >
        Read more
      </Link>
    </div>
  );
}
