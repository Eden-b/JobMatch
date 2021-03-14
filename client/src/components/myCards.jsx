import { Box, Button, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import CardsContainer from './cardsContainer';
import Title from './title';
import FormModal from './Modals/formModal';
import AddCardForm from './addCardForm';
import EditCardForm from './editCardForm';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserCardsAction } from '../redux/card/cardActions';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

export const formModalContext = React.createContext();

const MyCards = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { myCards } = useSelector((state) => state.card);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    dispatch(getAllUserCardsAction());
  }, [dispatch]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.replace({ pathname: '/my-cards' });
  };

  const [, setIsEdit] = React.useState(false);
  return (
    <Grid container style={{ width: '100%' }} justify="center">
      <Grid item style={{ width: '100%' }}>
        <Box my={4}>
          <Title title="My Cards" />
        </Box>
        <Box mb={2}>
          <Button
            style={{ color: 'white', background: '#2D8955', fontWeight: 700 }}
            variant="contained"
            onClick={handleOpen}
          >
            Add Card
          </Button>
        </Box>
        <formModalContext.Provider value={[open, setOpen, setIsEdit]}>
          <FormModal open={open} handleClose={handleClose}>
            <Router>
              <Route exact path="/my-cards">
                <AddCardForm handleClose={handleClose} />
              </Route>
              <Route
                exact
                path="/my-cards/:id"
                children={<EditCardForm handleClose={handleClose} />}
              />
            </Router>
          </FormModal>
          <CardsContainer isMenu={true} cards={myCards} />
        </formModalContext.Provider>
      </Grid>
    </Grid>
  );
};

export default MyCards;
