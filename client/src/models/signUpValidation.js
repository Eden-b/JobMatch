import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'this field should be minimum 2 characters long')
    .max(30)
    .required('this field is required.'),
  lastName: Yup.string()
    .min(2, 'this field should be minimum 2 characters long')
    .max(30)
    .required('this field is required.'),
  email: Yup.string()
    .email('must a be valid email address')
    .min(6, 'this field should be minimum 6 characters long')
    .max(1024)
    .required('this field is required.'),

  password: Yup.string()
    .min(6, 'this field should be minimum 6 characters long')
    .max(1024)
    .required('this field is required.'),
});
