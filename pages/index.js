import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Head >
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
