import axios from 'axios';
import _ from 'lodash';

export default async function handler(req, res) {
  const url = process.env.ALPHA_URL;
  const apikey = process.env.ALPHA_APIKEY;

  const timeSeries = {
    oneMin: 'Time Series (1min)',
    open: '1. open',
    high: '2. high',
    low: '3. low',
    close: '4. close',
    volume: '5. volume',
  };

  const response = await axios.get(url, {
    params: {
      function: 'TIME_SERIES_INTRADAY',
      symbol: 'MSFT',
      interval: '1min',
      adjusted: 'true',
      outputsize: 'full',
      datatype: 'json',
      apikey,
    },
  });

  const dataCollection = response.data[timeSeries.oneMin];
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

  res.status(200).json({ ohlcCollection, volumeCollection });
}
