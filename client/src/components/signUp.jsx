import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Formik, Form } from 'formik';
import FormInput from './formInput';
import { signUpSchema } from '../models/signUpValidation';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/auth/authActions';
import Alert from '@material-ui/lab/Alert';
import { objToLowerString } from '../helpers/helpers';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: '20px',
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

export default function SignUp() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const error = useSelector((state) => state.error);
  const successfulMsg = useSelector((state) => state.auth.successMsg);
  let history = useHistory();
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    await dispatch(
      userRegister(objToLowerString(values), 'User successfully created.')
    );
    actions.setSubmitting(false);
    actions.resetForm();
    setTimeout(() => {
      history.replace('/login');
    }, 2000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={signUpSchema}
        >
          {(props) => {
            return (
              <Form className={classes.form} autoComplete="off">
                <Grid container spacing={2}>
                  {(successfulMsg ||
                    error.id === 'User already registered.') && (
                    <Grid item xs={12}>
                      <Alert severity={error.id ? 'error' : 'success'}>
                        {successfulMsg || error.message}
                      </Alert>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                    <FormInput
                      required
                      fullWidth
                      name="firstName"
                      placeholder={'First Name'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInput
                      required
                      fullWidth
                      name="lastName"
                      placeholder={'Last Name'}
                    />
                  </Grid>
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
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link component={NavLink} to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
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
