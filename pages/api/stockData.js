import axios from 'axios';
import _ from 'lodash';

export default async function handler(req, res) {
  const ohlcCollection = [];
  const volumeCollection = [];
  const url = process.env.ALPHA_URL;
  const apikey = process.env.ALPHA_APIKEY;
  const timeSeries = {
    error: 'Error Message',
    daily: 'Time Series (Daily)',
    open: '1. open',
    high: '2. high',
    low: '3. low',
    close: '4. close',
    adjustedClose: '5. adjusted close',
    volume: '6. volume',
    dividendAmount: '7. dividend amount',
    splitCoefficient: '8. split coefficient',
  };

  try {
    const response = await axios.get(url, {
      params: {
        function: 'TIME_SERIES_DAILY_ADJUSTED',
        symbol: 'MSFT',
        outputsize: 'full',
        datatype: 'json',
        apikey,
      },
    });

    if (response.data && response.data[timeSeries.error]) {
      throw new Error(response.data[timeSeries.error]);
    }

    const dataCollection = response.data[timeSeries.daily];
    const dates = _.keys(dataCollection);

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
  } catch (error) {
    console.log(error);
  }
  
  res.status(200).json({ ohlcCollection, volumeCollection });
}
