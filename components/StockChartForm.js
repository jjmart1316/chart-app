import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { AutoComplete } from '../components/formik/Autocomple';
import { symbols, timeSeries, timeSeriesLabels } from '../staticData/stockValues';
import { Selection } from './formik/Selection';
import StockChart from './Stockchart';

const StockChartForm = () => {
  return (
    <Box>
      <StockChart />
      <Box sx={{ mt: 1 }}>
        <Formik
          initialValues={{
            timeSeries: '',
            symbols: null,
          }}
        >
          {(props) => (
            <Form>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Selection
                  fieldProps={timeSeriesLabels}
                  displayProps={timeSeries}
                />
                <AutoComplete
                  fieldProps={{ name: 'symbols', id: 'symbols' }}
                  autoCompleteList={symbols}
                  textFieldProps={{ label: 'Symbols' }}
                  formikProps={props}
                />
              </Box>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default StockChartForm;
