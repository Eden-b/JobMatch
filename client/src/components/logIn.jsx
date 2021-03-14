import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Formik, Form } from 'formik';
import FormInput from './formInput';
import { logInSchema } from '../models/logInValidation';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/auth/authActions';
import Alert from '@material-ui/lab/Alert';
import {objToLowerString} from '../helpers/helpers'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
    height: '450px',
    placeContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2D8955',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const error = useSelector((state) => state.error);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    await dispatch(userLogin(objToLowerString(values)));
    actions.setSubmitting(false);
    actions.resetForm();
    console.log(error);
    if (!error.message) window.location = '/';
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={logInSchema}
        >
          {(props) => {
            return (
              <Form className={classes.form} autoComplete="off">
                <Grid container spacing={2}>
                  {error.message === 'Invalid email or password.' && (
                    <Grid item xs={12}>
                      <Alert severity={'error'}>{error.message}</Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <FormInput
                      required
                      fullWidth
                      name="email"
                      placeholder={'Email Address'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInput
                      required
                      fullWidth
                      name="password"
                      placeholder={'Password'}
                      type="password"
                    />
                  </Grid>
                </Grid>
                <Button
                  disabled={
                    !props.isValid || !props.dirty || props.isSubmitting
                  }
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Log in
                </Button>
                <Grid container justify="flex-end">
                  <Grid item></Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Paper>
      <Box mt={5}></Box>
    </Container>
  );
}
