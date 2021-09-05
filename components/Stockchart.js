import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@material-ui/core';

const StockChart = ({ chartOptions, params, chartType }) => {
  const [chart, setChart] = useState({ ...chartOptions });

  const requestData = async () => {
    const response = await axios({
      url: 'api/timeSeries/dailyAdjusted',
      params: {
        ...params,
        chartType,
      },
    });

    const { series, title } = response.data;
    setChart((prevState) => ({ ...prevState, series, title }));
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={chart}
      />
      <Button variant='contained' onClick={requestData}>
        Get Data
      </Button>
    </div>
  );
};

export default StockChart;
