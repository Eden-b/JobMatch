import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useDispatch } from 'react-redux';
import {
  getSearchedCardsAction,
  clearSearchedCardsAction,
} from '../redux/card/cardActions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    height: 70,
    background: '#2C2D2E',
    [theme.breakpoints.up('sm')]: {
      width: '550px',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: 100,
  },
  iconButton: {
    padding: 10,
    color: 'white',
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [inputVal, setInputVal] = useState('');
  const dispatch = useDispatch();
  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getSearchedCardsAction(inputVal));
  }

  function handleOnChange(e) {
    setInputVal(e.target.value);
    dispatch(getSearchedCardsAction(e.target.value));
    if (e.target.value === '') return dispatch(clearSearchedCardsAction());
  }

  useEffect(() => {
    return () => {
      dispatch(clearSearchedCardsAction());
    };
  }, [dispatch]);
  return (
    <>
      <Box mb={4}>
        <Typography
          style={{ color: 'white', fontWeight: 300 }}
          color="textPrimary"
          variant="h4"
        >
          Find Candidate
        </Typography>
      </Box>
      <Paper
        component="form"
        autoComplete="off"
        className={classes.root}
        onSubmit={handleOnSubmit}
      >
        <InputBase
          name="q"
          color="primary"
          className={classes.input}
          placeholder="job title, keywords or candidate name"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={inputVal}
          onChange={handleOnChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
}
