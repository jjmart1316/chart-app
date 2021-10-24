import Head from 'next/head';
import Navigationbar from '../components/Navigationbar';

const Home = () => {

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <main>
        {/* <Link href='/stockChart'>
          Stock Chart
        </Link> */}

        <Navigationbar />
      </main>
    </div>
  );
};

export default Home;
