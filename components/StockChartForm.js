import React from 'react';
import { MenuItem, Box } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Select } from 'formik-mui';
import styles from '../styles/StockForm.module.scss';
import StockChart from './Stockchart';

const StockChartForm = () => {

  return (
    <Box>
      <Box><StockChart /></Box>
      <Box  className={styles.outerBox}>
        <Formik
          initialValues={{
            timeSeries: '',
          }}
        >
          {(props) => (
            <Form>
                <Field
                  component={Select}
                  label='Time Series'
                  style={{ width: 150 }}
                  name='timeSeries'
                  inputProps={{
                    id: 'timeSeries',
                    name: 'timeSeries',
                  }}
                >
                  <MenuItem value={'daily'}>Daily</MenuItem>
                  <MenuItem value={'dailyAdjusted'}>Daily Adjusted</MenuItem>
                </Field>
              <pre>{JSON.stringify(props, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default StockChartForm;
