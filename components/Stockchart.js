import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';

const timeSeries = {
  oneMin: 'Time Series (1min)',
  open: '1. open',
  high: '2. high',
  low: '3. low',
  close: '4. close',
  volume: '5. volume',
};

const StockChart = () => {
  const [ohlc, setohlc] = useState([]);
  const [volume, setVolume] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_INTRADAYS_1MIN_URL, {
            params: {
              function: 'TIME_SERIES_INTRADAY',
              symbol: 'MSFT',
              interval: '1min',
              adjusted: 'true',
              outputsize: 'full',
              datatype: 'json',
              apikey: process.env.NEXT_PUBLIC_APIKEY,
              
            }
          }
        );

        const dataCollection = response.data[timeSeries.oneMin];

        if (!dataCollection) {
          throw response.data;
        }

        const dates = _.keys(dataCollection);
        const ohlcCollection = [];
        const volumeCollection = [];

        _.forEachRight(dates, (date) => {
          ohlcCollection.push([
            new Date(date).getTime(),
            Number(dataCollection[date][timeSeries.open]),
            Number(dataCollection[date][timeSeries.high]),
            Number(dataCollection[date][timeSeries.low]),
            Number(dataCollection[date][timeSeries.close]),
          ]);

          volumeCollection.push([
            new Date(date).getTime(),
            Number(dataCollection[date][timeSeries.volume]),
          ]);
        });

        setohlc(ohlcCollection);
        setVolume(volumeCollection);

      } catch (error) {
        console.error(error);
      }
    };

    fetchStockData();
  }, []);

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
    </div>
  );
};

export default StockChart;
