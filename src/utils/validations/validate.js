import {
  validatePassword,
  validateEmail,
  validateTextField,
  validateConfirmPassword,
} from './validateFunctions';

const validate = (values, optionalFields = []) => {
  let errors = {};
  let requiredFields = { ...values };
  optionalFields.forEach((key) => delete requiredFields[key]);
  for (const [key, value] of Object.entries(requiredFields)) {
    validateTextField(key, value, errors);
  }
  return errors;
};

const validateAuth = (values, isRegister) => {
  let errors = {};
  validatePassword('password', values.password, errors);
  validateEmail('email', values.email, errors);
  if (isRegister) {
    validateConfirmPassword(
      'confirmPassword',
      values.confirmPassword,
      errors,
      values.password
    );
    validateTextField('firstName', values.firstName, errors);
    validateTextField('lastName', values.lastName, errors);
  }
  return errors;
};

export { validate, validateAuth };
