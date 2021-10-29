import { Grid, Typography } from '@mui/material';
import Navigationbar from '../components/Navigationbar';

const Home = () => {
  return (
    <div>
      <main>
        <Navigationbar />
        <Grid
          container
          textAlign='center'
          justifyContent='center'
          direction='column'
          alignItems='center'
        >
          <Grid item>
            <Typography marginTop='35vh' variant='h2' fontFamily='cursive'>
              Welcome
            </Typography>
            <Typography variant='h2' fontFamily='cursive'>
              Please sign in / up
            </Typography>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default Home;
