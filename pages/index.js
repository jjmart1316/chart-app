import Head from 'next/head';
import Link from '@mui/material/Link';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        <Link href='/stockChart'>
          Stock Chart
        </Link>
      </main>
    </div>
  );
};

export default Home;
