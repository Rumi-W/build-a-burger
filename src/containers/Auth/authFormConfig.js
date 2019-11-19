export const initForm = {
  email: {
    isValid: false,
    value: '',
    id: 'email',
    label: 'Email',
    type: 'email',
    labelWidth: 50,
    validationRules: {
      required: true,
      email: true
    },
    inputFieldType: 'text'
  },
  password: {
    isValid: false,
    value: '',
    id: 'password',
    label: 'Password',
    type: 'password',
    labelWidth: 50,
    validationRules: {
      required: true,
      minLength: 6
    },
    inputFieldType: 'text'
  }
};
