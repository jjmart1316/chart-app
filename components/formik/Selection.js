import { MenuItem } from '@mui/material';
import { Field } from 'formik';
import { Select } from 'formik-mui';
import { keys } from 'lodash';

export const Selection = ({ fieldProps, displayProps }) => {
  const { name } = fieldProps;

  return (
    <Field
      {...fieldProps}
      component={Select}
      style={{ width: 150 }}
      inputProps={{
        id: name,
        name: name,
      }}
    >
      {keys(displayProps).map((key) => (
        <MenuItem key={`${key}`} value={`${key}`}>
          {`${displayProps[key]}`}
        </MenuItem>
      ))}
    </Field>
  );
};
