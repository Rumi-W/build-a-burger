import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@material-ui/core';
import { zipCodeValidator } from '../../utilities/utilities';

const NumberFormatCustom = props => {
  const { inputRef, onChange, numFormat, numMask, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      // format="+1 (###) ###-####"
      // mask="_"
      format={numFormat}
      mask={numMask}
    />
  );
};

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

const InputFieldNumber = ({
  styleClass,
  id,
  label,
  type,
  labelWidth,
  numFormat,
  numMask,
  validationRules,
  handleInputValueChange
}) => {
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = e => {
    let isValid = true;
    let inputValue = e.target.value;
    setValue(inputValue); // for display

    if (!validationRules) {
      return true;
    }

    if (validationRules.required) {
      isValid = inputValue.trim() !== '' && isValid;
    }

    if (validationRules.zip) {
      isValid = zipCodeValidator(inputValue) && isValid;
    }
    setIsError(!isValid);
    handleInputValueChange(inputValue, id, isValid);
  };

  return (
    <FormControl
      error={isError}
      className={styleClass}
      variant="outlined"
      fullWidth
      required
      margin="dense">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        autoComplete="off"
        id={id}
        name={id}
        type={type}
        value={value}
        labelWidth={labelWidth}
        onChange={handleChange}
        aria-describedby={`helper-text-${id}`}
        inputComponent={NumberFormatCustom}
        inputProps={{
          numFormat,
          numMask
        }}
      />
      <FormHelperText
        id="helper-text-firstName"
        style={{ marginTop: '2px' }}>
        {isError ? 'Error' : ''}
      </FormHelperText>
    </FormControl>
  );
};

export default InputFieldNumber;
