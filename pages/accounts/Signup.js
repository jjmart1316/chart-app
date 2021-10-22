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
import styles from '../../styles/Signup.module.scss';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { deepPurple } from '@mui/material/colors';

const Signup = () => {
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
          initialValues={{
            email: '',
            password: '',
            userName: '',
            confirmPassword: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              alert(JSON.stringify(values, null, 2));
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
              <Grid container className={styles.accountSignin} >
                <Grid item>
                  <Link href='#' variant='body2'>
                    Already have an account? Sign in
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

export default Signup;
