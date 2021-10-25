import Navigationbar from '../components/Navigationbar';
import StockChart from '../components/Stockchart';
import StockChartForm from '../components/StockChartForm';

const stockChart = () => {
  return (
    <>
      <Navigationbar />
        <StockChartForm>
          <StockChart />
        </StockChartForm>
    </>
  );
};

export default stockChart;
