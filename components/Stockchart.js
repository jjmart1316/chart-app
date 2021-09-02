import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { useState } from 'react';

const StockChart = () => {
  const [ohlc, setOhlc] = useState([]);
  const [volume, setVolume] = useState([]);

  const requestData = async () => {
    const response = await axios.get('api/timeSeries/dailyAdjusted');
    const { ohlcCollection, volumeCollection } = response.data;
    setOhlc(ohlcCollection);
    setVolume(volumeCollection);
  };

  const options = {
    yAxis: [
      {
        labels: {
          align: 'left',
        },
        height: '80%',
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: 'left',
        },
        top: '80%',
        height: '20%',
        offset: 0,
      },
    ],
    tooltip: {
      shape: 'square',
      headerShape: 'callout',
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY,
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop,
          };
        }

        return position;
      },
    },

    title: {
      text: 'MSFT chart',
    },
    series: [
      {
        type: 'candlestick',
        data: ohlc,
        name: 'ohlc stock price',
        id: 'msft-ohlc',
      },
      {
        type: 'column',
        id: 'msft-volume',
        name: 'MSFT Volume',
        data: volume,
        yAxis: 1,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
      <button onClick={requestData}> Get Data </button>
    </div>
  );
};

export default StockChart;
