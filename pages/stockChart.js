import { Container } from '@material-ui/core';
import StockChart from '../components/Stockchart';
import { companies } from '../utils/companies';

const stockChart = () => {

  const chartType = 'line';
  const params = {
    function: 'TIME_SERIES_DAILY_ADJUSTED',
    symbol: 'MSFT',
    outputsize: 'full',
    datatype: 'json',
  };

  const options = {
    credits: {
      enabled: false,
    },
    series: [],
    title: {
      text: '',
    },
  };

  return (
    <div>
      <Container>
        <StockChart chartOptions={options} params={params} chartType={chartType} />
      </Container>
    </div>
  );
};

export default stockChart;
