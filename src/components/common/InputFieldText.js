import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@material-ui/core';
import {
  emailValidator,
  zipCodeValidator
} from '../../utilities/utilities';

const InputFieldText = ({
  formCtrlStyleClass,
  id,
  label,
  type,
  labelWidth,
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

    if (validationRules.minLength) {
      isValid =
        inputValue.trim().length >= validationRules.minLength &&
        isValid;
    }

    if (validationRules.email) {
      isValid = emailValidator(inputValue) && isValid;
    }

    if (validationRules.zip) {
      isValid = zipCodeValidator(inputValue) && isValid;
    }
    setIsError(!isValid);
    handleInputValueChange(inputValue, id, isValid);
  };

  const inputProp = { type };
  return (
    <FormControl
      error={isError}
      className={formCtrlStyleClass}
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
        inputProps={inputProp}
      />
      <FormHelperText
        id={`helper-text-${id}`}
        style={{ marginTop: '2px' }}>
        {isError ? 'Error' : ''}
      </FormHelperText>
    </FormControl>
  );
};

export default InputFieldText;
