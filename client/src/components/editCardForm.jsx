import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { Formik, Form } from 'formik';
import FormInput from './formInput';
import { addCardValidation } from '../models/addCardValidation';
import { useDispatch, useSelector } from 'react-redux';
import { editCardAction } from '../redux/card/cardActions';
import FileBase64 from 'react-file-base64';
import { useParams } from 'react-router-dom';

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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditCardForm({ handleClose }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const editCard = useSelector((state) =>
    state.card.myCards.find((card) => card._id === id)
  );
  const handleSubmit = async (body, actions) => {
    actions.setSubmitting(true);
    dispatch(editCardAction(id, body));
    actions.setSubmitting(false);
    handleClose();
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={0} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Card
        </Typography>
        <Formik
          initialValues={{
            fullName: editCard.fullName,
            position: editCard.position,
            title: editCard.title,
            subject: editCard.subject,
            image: editCard.image,
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
                  SUBMIT
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
