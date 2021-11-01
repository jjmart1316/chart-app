import { Box, Button, LinearProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import { AutoComplete } from '../components/formik/Autocomple';
import {
  stockFormInitialValues,
  stockFormSchemaValidation
} from '../models/formValidations/TimeSeries';
import {
  symbols,
  timeSeries,
  timeSeriesLabels
} from '../staticData/stockValues';
import { Selection } from './formik/Selection';
import StockChart from './Stockchart';

const StockChartForm = () => {
  return (
    <Box>
      <Box sx={{ mt: 1 }}>
        <Formik
          validationSchema={stockFormSchemaValidation}
          initialValues={stockFormInitialValues}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);

            setTimeout(() => {
              setSubmitting(false);
            }, 2000);
          }}
        >
          {(props) => (
            <Form>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
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
                <Button
                  type='submit'
                  variant='outlined'
                  disabled={props.isSubmitting}
                  onClick={props.submitForm}
                >
                  Get Data
                </Button>
              </Box>
              {props.isSubmitting && <LinearProgress />}
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Box>
      <StockChart />
    </Box>
  );
};

export default StockChartForm;
