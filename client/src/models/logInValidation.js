import * as Yup from 'yup';

export const logInSchema = Yup.object().shape({
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
