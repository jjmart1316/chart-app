import { Button } from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';

const Login = () => {
  return (
    <div className='login-form'>

          <Formik initialValues={{ email: '', password: '' }}>
            {({ values }) => (
              <Form>
                <Field
                  component={TextField}
                  name='email'
                  type='email'
                  label='Email'
                />
                <br />
                <Field
                  component={TextField}
                  name='password'
                  type='password'
                  label='Password'
                />
                <br />
                <br />
                <Button size='small' color='primary'>
                  Login
                </Button>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Form>
            )}
          </Formik>

    </div>
  );
};

export default Login;
