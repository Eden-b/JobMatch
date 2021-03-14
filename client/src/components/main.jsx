import React, { useEffect } from 'react';
import Title from './title';
import CardsContainer from './cardsContainer';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllCardsAction,
  getUserFavoriteCardsAction,
} from '../redux/card/cardActions';

const Main = () => {
  const { cards } = useSelector((state) => state.card);
  const { searched } = useSelector((state) => state.card);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCardsAction());
    if (isAuthenticated) dispatch(getUserFavoriteCardsAction());
  }, [dispatch, isAuthenticated]);

  return (
    <Box my={5} style={{ width: '100%' }}>
      <Container>
        <Box my={4}>
          <Title title="Candidates" />
        </Box>
        <Box my={4}>
          <CardsContainer
            cards={!searched.length ? cards : searched}
            favorite={true}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Main;
