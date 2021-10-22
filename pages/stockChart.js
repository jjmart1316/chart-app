import { Button, Container } from '@mui/material';
import StockChart from '../components/Stockchart';
import StockChartForm from '../components/StockChartForm';

const stockChart = () => {
  return (
    <Container>
      <StockChartForm>
        <StockChart />
      </StockChartForm>
    </Container>
  );
};

export default stockChart;
