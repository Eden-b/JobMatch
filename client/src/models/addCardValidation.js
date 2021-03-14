import * as Yup from 'yup';

export const addCardValidation = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'this field should be minimum 2 characters long')
    .max(255)
    .required('this field is required.'),
  position: Yup.string()
    .min(2, 'this field should be minimum 2 characters long')
    .max(255)
    .required('this field is required.'),
  title: Yup.string()
    .min(10, 'this field should be minimum 6 characters long')
    .max(100)
    .required('this field is required.'),
  subject: Yup.string()
    .min(10, 'this field should be minimum 6 characters long')
    .max(1024)
    .required('this field is required.'),
  image: Yup.string(),
});
