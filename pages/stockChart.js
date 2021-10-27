import { Box } from '@mui/system';
import Navigationbar from '../components/Navigationbar';
import StockChartForm from '../components/StockChartForm';

const stockChart = () => {
  return (
    <Box>
      <Navigationbar />
      <StockChartForm />
    </Box>
  );
};

export default stockChart;
