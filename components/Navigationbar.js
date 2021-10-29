import { AppBar, Toolbar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from '../components/Link'

const Navigationbar = () => {
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

  return (
    <AppBar color='transparent' position='static' sx={{ mb: 2 }}>
      <Toolbar>
        <Link underline='hover' href='/' sx={{ flexGrow: 1 }}>
          Home
        </Link>
        {!user.isLoggedin && (
          <Link underline='hover' href='/Signin' sx={{ mx: 2 }}>
            Sign in
          </Link>
        )}
        {!user.isLoggedin && (
          <Link underline='hover' href='/Signup' sx={{ mx: 2 }}>
            Sign up
          </Link>
        )}
        {user.isLoggedin && (
          <Link underline='hover' href='/' onClick={ async () => axios.delete('/api/session/logout')} sx={{ mx: 2 }}>
            Sign out
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigationbar;
