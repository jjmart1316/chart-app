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
          <a>Stock Chart</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
