import Highcharts from 'highcharts/highstock';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@material-ui/core';

//init the module
NoDataToDisplay(Highcharts);

const StockChart = () => {
  const [chart, setChart] = useState({
    lang: { noData: 'No Data To Display' },
    chart: {
      type: 'candlestick',
    },
    credits: {
      enabled: false,
    },
    series: [],
    title: {
      text: '',
    },
    apiParams: {
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol: 'MSFT',
      outputsize: 'full',
      datatype: 'json',
    },
  });

  const requestData = async () => {
    const response = await axios({
      url: 'api/timeSeries/dailyAdjusted',
      params: {
        ...chart.apiParams,
      },
    });

    const { series, title } = response.data;
    setChart((prevState) => ({ ...prevState, series, title }));
  };

  const updateChartType = () => {
    setChart((prevState) => ({
      // Todo: chart a selection type for user
      ...prevState,
      chart: {
        type: 'line',
      },
    }));
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
      <Button variant='contained' onClick={updateChartType} >Change chart type</Button>
    </div>
  );
};

export default StockChart;
