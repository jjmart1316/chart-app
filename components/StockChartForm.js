import React from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { Select } from 'formik-mui';

const StockChartForm = ({ children }) => {
  const wrapper = React.createRef();

  return (
    <div>
      <div ref={wrapper}>{children}</div>

      <div  className='stock-chart-form'>
        <Formik
          initialValues={{
            timeSeries: '',
          }}
        >
          {({ values }) => (
            <Form>
              <FormControl>
                <InputLabel htmlFor='time-series-type'>
                  Time Series Type
                </InputLabel>
                <Field
                  component={Select}
                  style={{ width: 300 }}
                  name='timeSeries'
                  inputProps={{
                    id: 'timeSeries',
                    name: 'timeSeries',
                  }}
                >
                  <MenuItem value={'daily'}>Daily</MenuItem>
                  <MenuItem value={'dailyAdjusted'}>Daily Adjusted</MenuItem>
                </Field>
              </FormControl>

              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StockChartForm;
