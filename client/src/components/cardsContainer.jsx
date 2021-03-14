import Card from './card';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      margin: '0 auto',
      width: '80%',
    },
  },
}));
const CardsContainer = ({ cards, isMenu, favorite }) => {
  const classes = useStyles();
  const { favorites } = useSelector((state) => state.card);

  const newArr = [];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (!favorites.length)
      newArr.push(
        <Grid key={card._id} item xs={12} sm={6} md={4} lg={3}>
          <Card isMenu={isMenu} card={card} favorite={favorite} />
        </Grid>
      );
    for (let j = 0; j < favorites.length; j++) {
      const favCard = favorites[j];
      if (card._id === favCard._id) {
        newArr.push(
          <Grid key={favCard._id} item xs={12} sm={6} md={4} lg={3}>
            <Card
              isMenu={isMenu}
              card={favCard}
              favorite={favorite}
              isFav={true}
            />
          </Grid>
        );
        break;
      }
      if (j === favorites.length - 1 && card._id !== favCard._id) {
        newArr.push(
          <Grid key={card._id} item xs={12} sm={6} md={4} lg={3}>
            <Card isMenu={isMenu} card={card} favorite={favorite} />
          </Grid>
        );
      }
    }
  }
  return (
    <Grid container spacing={3} className={classes.root}>
      {newArr.length ? (
        newArr
      ) : (
        <Typography
          variant="subtitle1"
          style={{ margin: '0 auto', color: '#9c9c9c', fontWeight: 300 }}
          component="i"
        >
          Cards not created yet.
        </Typography>
      )}
    </Grid>
  );
};

export default CardsContainer;
