import { Breadcrumbs, Container, Paper, Typography, Link } from '@mui/material';
import styles from '../styles/Navigationbar.module.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Navigationbar = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: '',
    email: '',
    isLoggedin: false,
  });

  useEffect(() => {
    const getSessionUser = async () => {
      const { data } = await axios.get('/api/session/user');
      if (data?.user && data.user?.isLoggedin) {
        const { username, email, isLoggedin } = data.user;
        setUser({ username, email, isLoggedin });
      }
    };
    getSessionUser();
  }, []);

  const handleSignOut = async (e, path) => {
    e.preventDefault();
    await axios.delete('/api/session/logout');
    setUser({ isLoggedin: false });
    router.push(path);
  };

  return (
    <Paper>
      <Container>
        <Breadcrumbs className={styles.navigationbar}>
          <Link
            underline='hover'
            color='inherit'
            href='/'
            onClick={() => console.log('clicked')}
          >
            <Typography color='text.primary'>Home</Typography>
          </Link>
          {!user.isLoggedin && <SignIn />}
          {!user.isLoggedin && <SignUp />}
          {user.isLoggedin && (
            <Link
              underline='hover'
              color='inherit'
              onClick={(e) => handleSignOut(e, '/')}
            >
              <Typography color='text.primary'>Sign out</Typography>
            </Link>
          )}
        </Breadcrumbs>
      </Container>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Paper>
  );
};

const SignIn = () => {
  return (
    <Link underline='hover' color='inherit' href='/Signin'>
      <Typography color='text.primary'>Sign in</Typography>
    </Link>
  );
};

const SignUp = () => {
  return (
    <Link underline='hover' color='inherit' href='/Signup'>
      <Typography color='text.primary'>Sign up</Typography>
    </Link>
  );
};

export default Navigationbar;
