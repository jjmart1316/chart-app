import axios from 'axios';
import _ from 'lodash';

const timeSeries = Object.freeze({
  metadata: 'Meta Data',
  information: '1. Information',
  symbol: '2. Symbol',
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
});

export default async function handler(req, res) {
  let metadata = {};
  const ohlc = [];

  try {
    const response = await axios.get(process.env.ALPHA_URL, {
      params: { ...req.query, apikey: process.env.ALPHA_APIKEY },
    });

    if (response.data && response.data[timeSeries.error]) {
      throw new Error(response.data[timeSeries.error]);
    }

    metadata = response.data[timeSeries.metadata];
    const dataCollection = response.data[timeSeries.daily];
    const dates = _.keys(dataCollection);

    _.forEachRight(dates, (date) => {
      ohlc.push([
        new Date(date).getTime(),
        Number(dataCollection[date][timeSeries.open]),
        Number(dataCollection[date][timeSeries.high]),
        Number(dataCollection[date][timeSeries.low]),
        Number(dataCollection[date][timeSeries.close]),
      ]);
    });
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    series: [
      {
        // type: chartType,
        data: ohlc,
        name: metadata[timeSeries.symbol],
      },
    ],

    title: { text: `${metadata[timeSeries.symbol]} ${metadata[timeSeries.information]}` },
  });
}
