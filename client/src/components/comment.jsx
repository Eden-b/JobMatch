import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },

  avatar: {},
}));

export default function Comment({ comment, user }) {
  const classes = useStyles();
  function capitalNames(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        style={{ padding: '0px 16px' }}
        title={
          <Typography variant="subtitle2">{`${capitalNames(
            comment.firstName
          )} ${capitalNames(comment.lastName)}`}</Typography>
        }
        subheader={
          <Typography variant="caption" color="textSecondary">
            {moment(comment.createdAt).format('LL')}
          </Typography>
        }
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment.commentText}
        </Typography>
      </CardContent>
    </Card>
  );
}
