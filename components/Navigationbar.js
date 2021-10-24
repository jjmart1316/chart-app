import { Breadcrumbs, Container, Link, Paper, Typography } from '@mui/material';
import styles from '../styles/Navigationbar.module.scss';

const Navigationbar = () => {
  return (
    <Paper>
      <Container>
        <Breadcrumbs className={styles.navigationbar}>
          <Link underline='hover' color='inherit' href='/'>
            <Typography color='text.primary'>Home</Typography>
          </Link>
          <Link underline='hover' color='inherit' href='/Signin'>
            <Typography color='text.primary'>Sign in</Typography>
          </Link>
          <Link underline='hover' color='inherit' href='/Signup'>
            <Typography color='text.primary'>Sign up</Typography>
          </Link>
        </Breadcrumbs>
      </Container>
    </Paper>
  );
};

export default Navigationbar;
