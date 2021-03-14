import { Box, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import CardsContainer from './cardsContainer';
import Title from './title';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavoriteCardsAction } from '../redux/card/cardActions';

const Favorites = () => {
  const { favorites } = useSelector((state) => state.card);
  const dispatch = useDispatch();
  useEffect(() => dispatch(getUserFavoriteCardsAction()), [dispatch]);
  return (
    <Grid container style={{ width: '100%' }} justify="center">
      <Grid item style={{ width: '100%' }}>
        <Box my={4}>
          <Title title="Favorite" />
        </Box>
        <Box mb={2}>
          <CardsContainer cards={favorites} isMenu={false} favorite={true} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Favorites;
