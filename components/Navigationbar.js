import { Link, AppBar, Toolbar } from '@mui/material';
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
    setUser({ ...user, isLoggedin: false });
    router.push(path);
  };

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
          <Link underline='hover' onClick={(e) => handleSignOut(e, '/')} sx={{ mx: 2 }}>
            Sign out
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigationbar;
