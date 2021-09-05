import { Button, Container } from '@material-ui/core';
import StockChart from '../components/Stockchart';

const stockChart = () => {



  return (
    <div>
      <Container>
        <StockChart  />
        <Button variant='contained'>Hello</Button>
      </Container>
    </div>
  );
};

export default stockChart;
