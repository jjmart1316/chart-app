import {
  Button,
  Box,
  Container,
  Avatar,
  Typography,
  Grid,
  Stack,
  LinearProgress,
  Link,
} from '@mui/material';
import styles from '../styles/Signup.module.scss';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { deepPurple } from '@mui/material/colors';
import { hash } from 'bcryptjs';
import axios from 'axios';
import {
  UserSignupInitialValues,
  UserSignupSchema,
} from '../models/formValidations/User';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const createUser = async ({ username, email, password }) => {
    return axios.post('api/users', {
      params: { username, email, password: await hash(password, 12) },
    });
  };

  return (
    <Container maxWidth='xs'>
      <Box className={styles.outerBox}>
        <Stack direction='row' spacing={2}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            <LockOutlined />
          </Avatar>
        </Stack>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
      </Box>
      <Box className={styles.formContainer}>
        <Formik
          initialValues={UserSignupInitialValues}
          validationSchema={UserSignupSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            const { data } = await createUser(values);

            if (data?.error) {
              setFieldError(data.errorType, data.error);
            }

            if (!data?.error && data?.success) {
              router.push('/stockChart');
            }

            setTimeout(() => {
              setSubmitting(false);
            }, 500);
          }}
        >
          {(props) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name='username'
                    type='username'
                    label='User Name'
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name='email'
                    type='email'
                    label='Email'
                    autoComplete='email'
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name='password'
                    type='password'
                    label='Password'
                    autoComplete='new-password'
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name='confirmPassword'
                    type='password'
                    label='Confirm Password'
                    autoComplete='new-password'
                    required
                    fullWidth
                  />
                </Grid>
              </Grid>
              {props.isSubmitting && <LinearProgress />}
              <Button
                className={styles.submitButton}
                type='submit'
                fullWidth
                variant='contained'
                disabled={props.isSubmitting}
                onClick={props.submitForm}
              >
                Sign Up
              </Button>
              <Grid container className={styles.accountSignin}>
                <Grid item>
                  <Link href='/Signin' varian='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Signup;
