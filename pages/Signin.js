import {
  Link,
  Button,
  Container,
  Box,
  Stack,
  Avatar,
  Typography,
  Grid,
  LinearProgress,
} from '@mui/material';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { deepPurple } from '@mui/material/colors';
import { Form, Formik, Field } from 'formik';
import { TextField } from 'formik-mui';
import styles from '../styles/Signin.module.scss';
import axios from 'axios';
import { compare } from 'bcryptjs';

const Signin = () => {
  const fetchUser = async (username) => {
    return await axios.get('api/users', { params: { username } });
  };

  const validateUser = async (data, inputValues) => {
    if (!data.query) {
      return false;
    }
    return await compare(inputValues?.password, data.query.password);
  }

  return (
    <Container maxWidth='xs'>
      <Box className={styles.outerBox}>
        <Stack direction='row' spacing={2}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            <LockOutlined />
          </Avatar>
        </Stack>
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
      </Box>
      <Box className={styles.formContainer}>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await fetchUser(values.username);
            const isValidUser = await validateUser(response.data, values);

         
            // console.log('isValidUser:', isValidUser);

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
                    name='password'
                    type='password'
                    label='Password'
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/Signup' variant='body2'>
                    {`Don't have an account? Sign Up`}
                  </Link>
                </Grid>
              </Grid>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Signin;
