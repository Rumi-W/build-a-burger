export const initForm = {
  firstName: {
    isValid: false,
    value: '',
    id: 'firstName',
    label: 'First Name',
    type: 'text',
    labelWidth: 80,
    validationRules: {
      required: true
    },
    inputFieldType: 'text'
  },
  lastName: {
    isValid: false,
    value: '',
    id: 'lastName',
    label: 'Last Name',
    type: 'text',
    labelWidth: 80,
    validationRules: {
      required: true
    },
    inputFieldType: 'text'
  },
  // email: {
  //   isValid: false,
  //   value: '',
  //   id: 'email',
  //   label: 'Email',
  //   type: 'email',
  //   labelWidth: 50,
  //   validationRules: {
  //     required: true,
  //     email: true
  //   },
  //   inputFieldType: 'text'
  // },
  street: {
    isValid: false,
    value: '',
    id: 'street',
    label: 'Address: Street',
    type: 'text',
    labelWidth: 120,
    validationRules: {
      required: true
    },
    inputFieldType: 'text'
  },
  city: {
    isValid: false,
    value: '',
    id: 'city',
    label: 'Address: City',
    type: 'text',
    labelWidth: 100,
    validationRules: {
      required: true
    },
    inputFieldType: 'text'
  },
  zip: {
    isValid: false,
    value: '',
    id: 'zip',
    label: 'Zip',
    type: 'text',
    labelWidth: 30,
    validationRules: {
      required: true,
      zip: true
    },
    numFormat: '#####',
    numMask: '_',
    inputFieldType: 'number'
  },
  phone: {
    isValid: false,
    value: '',
    id: 'phone',
    label: 'Phone',
    type: 'tel',
    labelWidth: 50,
    validationRules: {
      required: true
    },
    numFormat: '+1 (###) ###-####',
    numMask: '_',
    inputFieldType: 'number'
  }
};
