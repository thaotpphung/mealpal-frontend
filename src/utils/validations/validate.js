import {
  validatePassword,
  validateEmail,
  validateTextField,
  validateConfirmPassword,
  validateArray,
} from './validateFunctions';

const validate = (values, optional = []) => {
  let errors = {};
  optional.forEach((key) => delete values[key]);
  for (const [key, value] of Object.entries(values)) {
    if (Array.isArray(value)) {
      console.log('validate array', key, value);
      validateArray(key, value, errors);
    } else if (typeof value === 'string') {
      console.log('validate text', key, value);
      validateTextField(key, value, errors);
    }
  }
  return errors;
};

const validateAuth = (values, isRegister) => {
  let errors = {};
  for (const [key, value] of Object.entries(values)) {
    if (key.includes('password')) {
      validatePassword(key, value, errors);
      continue;
    } else if (key.includes('email')) {
      validateEmail(key, value, errors);
      continue;
    } else if (key.includes('confirmPassword') && isRegister) {
      validateConfirmPassword(key, value, errors, values.password);
      continue;
    }
    if (isRegister) {
      validateTextField(key, value, errors);
    }
  }
  return errors;
};

export { validate, validateAuth };
