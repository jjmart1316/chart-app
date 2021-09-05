import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';
import fullScreen from 'highcharts/modules/full-screen';
import stockTools from 'highcharts/modules/stock-tools';
import annotationsAdvanced from 'highcharts/modules/annotations-advanced';
import priceIndicator from 'highcharts/modules/price-indicator';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/css/stocktools/gui.css';
import 'highcharts/css/annotations/popup.css';
import axios from 'axios';
import { useState } from 'react';
import { Button } from '@material-ui/core';

//init the module
if (typeof Highcharts === 'object') {
  NoDataToDisplay(Highcharts);
  HighchartsMore(Highcharts);
  annotationsAdvanced(Highcharts);
  priceIndicator(Highcharts);
  fullScreen(Highcharts);
  stockTools(Highcharts);
}

const StockChart = () => {
  const [chart, setChart] = useState({
    apiParams: {
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol: 'MSFT',
      outputsize: 'full',
      datatype: 'json',
    },
    credits: {
      enabled: false,
    },
    lang: { noData: 'No Data To Display' },
    chart: {
      type: 'line',
      events: {
        load() {
          let stockToolGui = this;
          stockToolGui.stockTools.showhideBtn.click();
        },
      },
    },
    series: [],
    title: {
      text: '',
    },
    stockTools: {
      gui: {
        buttons: [
          'currentPriceIndicator',
          'typeChange',
          'fullScreen',
          'zoomChange',
          'separator',
          'simpleShapes',
          'lines',
          'crookedLines',
          'measure',
          'advanced',
          'toggleAnnotations',
          'separator',
          'verticalLabels',
          'flags',
          'separator',
        ],
        definitions: {
          typeChange: {
            items: ['typeCandlestick', 'typeLine', 'typeOHLC'],
          },
        },
      },
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
