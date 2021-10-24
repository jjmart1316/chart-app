import * as yup from 'yup';

export const UserSignupSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is a required field')
    .min(3, 'name must be at least 3 characters'),
  email: yup.string().email().required('email is a required field'),
  password: yup.string().required('password is a required field'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .when('password', {
      is: (password) => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], `Password doesn't match`),
    }),
});

export const UserSignSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is a required field')
    .min(3, 'name must be at least 3 characters'),
  password: yup.string().required('password is a required field'),
});

export const UserSignupInitialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const UserSigninInitialValues = {
  username: '',
  password: '',
};
