import './App.css';
import NavBar from './components/navBar';
import Header from './components/header';
import SignUp from './components/signUp';
import LogIn from './components/logIn';
import MyCards from './components/myCards';
import Footer from './components/footer';
import Favorites from './components/favorites';
import Main from './components/main';
import ReadMore from './components/readMore';
import PrivateRoute from './components/privateRoute';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/auth/authActions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const useStyle = makeStyles({
  root: {
    background: '#2C2D2E',
    height: '100vh',
  },
});

function App() {
  const classes = useStyle();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });

  return (
    <Router>
      <div className={classes.root}>
        <Grid container style={{ height: '100vh' }}>
          <Grid item xs={12}>
            <Switch>
              <Route exact path="/" component={Header} />
              <Route path="*" component={NavBar} />
            </Switch>
          </Grid>
          <Grid item container>
            <Grid item xs={false} sm={1} />
            <Grid
              style={{ height: '100%', minHeight: 800, padding: '60px 20px' }}
              item
              container
              sm={10}
            >
              <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={LogIn} />
                <Route path="/signup" component={SignUp} />
                <PrivateRoute path="/my-cards">
                  <MyCards />
                </PrivateRoute>
                <PrivateRoute path="/cards/favorite">
                  <Favorites />
                </PrivateRoute>
                <Route path="/cards/:id/read-more" component={ReadMore} />
                <Route path="*" component={Main} />
              </Switch>
            </Grid>
            <Grid item xs={false} sm={1} />
          </Grid>
          <Grid container item alignItems="flex-end" xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
