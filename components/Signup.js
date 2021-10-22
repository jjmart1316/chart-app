import {
  Box,
  Container,
  Avatar,
  Typography,
  FormControl,
  Grid,
  Paper,
} from '@material-ui/core';
import styles from '../styles/Login.module.scss';
import { Lock } from '@material-ui/icons';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

const Signup = () => {
  return (
    <Container maxWidth='sm'>
        <Box className={styles.outerBox}>
          <Avatar>
            <Lock />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
        </Box>

        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(props) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={6} >
                  <Field
                      component={TextField}
                      autoComplete='given-name'
                      name='firstName'
                      label='firstName'
                      required
                      fullWidth
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={6} >
                  <Field
                      component={TextField}
                      autoComplete='family-name'
                      name='lastName'
                      label='lastName'
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
                </Grid>
                <pre>{JSON.stringify(props, null, 2)}</pre>
              </Form>
          )}
        </Formik>
    </Container>
  );
};

export default Signup;
