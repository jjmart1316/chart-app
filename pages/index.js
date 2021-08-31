import Head from 'next/head'
import StockChart from '../components/Stockchart';
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chart App</title>
        <meta name="description" content="Chart App / PNW Senior Design Project" />
      </Head>

      <main className={styles.main}>
        <StockChart />
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
};

export default Home;
