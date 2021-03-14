import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import SendIcon from '@material-ui/icons/Send';
import Comment from './comment';
import { Hidden } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { AddCardCommentsAction } from '../redux/comments/commentActions';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '800px',
    width: 700,
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      padding: 20,
    },
    [theme.breakpoints.up('md')]: {
      padding: 40,
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cardId = useParams();
  const cards = useSelector((state) => state.card.cards);
  const myCards = useSelector((state) => state.card.myCards);
  const { comments } = useSelector((state) => state.comments);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  let { fullName, title, subject, image, createdAt } = [
    ...cards,
    ...myCards,
  ].find((card) => cardId.id === card._id);
  const [textValue, setTextValue] = useState('');

  function addComment(e) {
    e.preventDefault();
    const data = {
      commentText: textValue,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    dispatch(AddCardCommentsAction(cardId.id, data));
    return setTextValue('');
  }

  return (
    <Card className={classes.root}>
      <Hidden smUp>
        <CardMedia className={classes.media} image={image} />
      </Hidden>
      <CardHeader
        avatar={
          <Hidden xsDown>
            <Avatar className={classes.avatar} src={image} />
          </Hidden>
        }
        title={<Typography variant="h6">{fullName}</Typography>}
        subheader={
          <Typography variant="subtitle2" color="textSecondary">
            {moment(createdAt).format('LL')}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="subtitle1" style={{ marginBottom: '30px' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {subject}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="subtitle1" style={{ paddingBottom: 15 }}>
          Comments
        </Typography>
        <Paper
          style={{
            overflow: 'scroll',
            height: 300,
            width: '100%',
            // position: 'relative',
          }}
        >
          {comments.map((comment) => (
            <Comment user={user} comment={comment} key={comment._id} />
          ))}
          {/* <Comment /> */}
          <hr style={{ width: '95%', margin: '0 auto', opacity: 0.6 }} />
        </Paper>
        <FormControl
          fullWidth
          style={{ marginTop: 20 }}
          className={clsx(classes.margin, classes.textField)}
        >
          <InputLabel htmlFor="add-comment">
            {isAuthenticated ? 'add comment' : 'please login to comment'}
          </InputLabel>
          <Input
            disabled={!isAuthenticated}
            autoFocus
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            id="add-comment"
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="add comment"
                  onClick={addComment}
                  disabled={!isAuthenticated}
                >
                  <SendIcon color="primary" />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </CardContent>
    </Card>
  );
}
