import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { Formik, Form } from 'formik';
import FormInput from './formInput';
import { addCardValidation } from '../models/addCardValidation';
import { useDispatch } from 'react-redux';
import { addCardAction } from '../redux/card/cardActions';
import PostAddIcon from '@material-ui/icons/PostAdd';
import FileBase64 from 'react-file-base64';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
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

export default function AddCardForm({ handleClose }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleSubmit = async (body, actions) => {
    actions.setSubmitting(true);
    dispatch(addCardAction(body));
    actions.setSubmitting(false);
    handleClose();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={0} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Card
        </Typography>
        <Formik
          initialValues={{
            fullName: '',
            position: '',
            title: '',
            subject: '',
            image: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={addCardValidation}
        >
          {(props) => {
            return (
              <Form className={classes.form} autoComplete="off">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormInput
                      required
                      fullWidth
                      name="fullName"
                      placeholder={'Full Name'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInput
                      required
                      fullWidth
                      name="position"
                      placeholder={'Position'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInput
                      required
                      fullWidth
                      name="title"
                      placeholder={'Title'}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInput
                      required
                      fullWidth
                      name="subject"
                      placeholder={'Subject'}
                      type="text"
                      rows={10}
                      multiline={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FileBase64
                      type="file"
                      name="image"
                      multiple={false}
                      accept=".jpeg, .png, .jpg"
                      onDone={({ base64 }) =>
                        props.setFieldValue('image', base64)
                      }
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
                  Add
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Paper>
      <Box mt={5}></Box>
    </Container>
  );
}
