import { Button, Container } from '@material-ui/core';
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
