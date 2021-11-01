import * as yup from 'yup';

export const stockFormSchemaValidation = yup.object().shape({
  timeSeries: yup.string().required('Time Series is a required field'),
  symbols: yup.object().required('select a symbol').nullable(),
});

export const stockFormInitialValues = {
  timeSeries: '',
  symbols: null,
};
