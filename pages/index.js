import Head from 'next/head';
import Link from 'next/link';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Home = () => {
  return (
    <div>
      <Head >
        <title>Home</title>
      </Head>
      
      <Signup />
        {/* <main>
          <Link href='/stockChart'>
            <a>Stock Chart</a>
          </Link>
        </main> */}
    </div>
  );
};

export default Home;
