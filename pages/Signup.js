import LockOutlined from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';
import { hash } from 'bcryptjs';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useRouter } from 'next/router';
import Link from '../components/Link';
import {
  UserSignupInitialValues,
  UserSignupSchema
} from '../models/formValidations/User';

const Signup = () => {
  const router = useRouter();

  const createUser = async ({ username, email, password }) => {
    return axios.post('api/users', {
      params: { username, email, password: await hash(password, 12) },
    });
  };

  const loginUser = async ({ username, email, password }) => {
    return axios.get('api/session/login', {
      params: { username, email, password },
    });
  };

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          mt: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            <LockOutlined />
          </Avatar>
        </Stack>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Formik
          initialValues={UserSignupInitialValues}
          validationSchema={UserSignupSchema}
          onSubmit={async (values, { setFieldError }) => {
            const { data } = await createUser(values);

            if (data?.error) {
              setFieldError(data.errorType, data.error);
            }

            if (!data?.error && data?.success) {
              await loginUser(values);
              router.push('/stockChart');
            }
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
                sx={{ mt: 2 }}
                type='submit'
                fullWidth
                variant='contained'
                disabled={props.isSubmitting}
                onClick={props.submitForm}
              >
                Sign Up
              </Button>
              <Link href='/Signin' varian='body2'>
                Already have an account? Sign in
              </Link>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Signup;
