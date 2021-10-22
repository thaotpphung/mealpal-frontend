import { validateTextField, validateField } from './validateFunctions';

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
  validateField('password', values.password, errors);
  validateField('username', values.username, errors);
  if (isRegister) {
    validateField('email', values.email, errors);
    validateField(
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
