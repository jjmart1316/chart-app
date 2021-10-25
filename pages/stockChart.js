import { Container } from '@mui/material';
import Navigationbar from '../components/Navigationbar';
import StockChart from '../components/Stockchart';
import StockChartForm from '../components/StockChartForm';

const stockChart = () => {
  return (
    <>
      <Navigationbar />
      <Container>
        <StockChartForm>
          <StockChart />
        </StockChartForm>
      </Container>
    </>
  );
};

export default stockChart;
