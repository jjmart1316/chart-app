import { TextField } from '@mui/material';
import { Field } from 'formik';
import { Autocomplete as formimuiAutocomplete } from 'formik-mui';
import { values } from 'lodash';

export const AutoComplete = (props) => {
  const { fieldProps, textFieldProps, autoCompleteList, formikProps } = props;

  return (
    <Field
      {...fieldProps}
      component={formimuiAutocomplete}
      filterSelectedOptions
      autoComplete
      options={autoCompleteList}
      getOptionLabel={(symbol) => {
        const valueList = values(symbol);
        
        if (valueList.length > 1) {
          return `${valueList[1]}: ${valueList[0]}`;
        }

        return 'missing value';
      }}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...textFieldProps}
          {...params}
          error={
            formikProps.touched['autocomplete'] &&
            !!formikProps.errors['autocomplete']
          }
          helperText={
            formikProps.touched['autocomplete'] &&
            formikProps.errors['autocomplete']
          }
          variant='outlined'
        />
      )}
    />
  );
};
