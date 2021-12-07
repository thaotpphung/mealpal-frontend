import { validateField } from './validateFunctions';

const validate = (values, optionalFields = []) => {
  let errors = {};
  let requiredFields = { ...values };
  optionalFields.forEach((key) => delete requiredFields[key]);
  for (const [key, value] of Object.entries(requiredFields)) {
    if (key === 'confirmPassword')
      validateField(key, value, errors, values.password);
    else validateField(key, value, errors);
  }
  return errors;
};

const validateAuth = (values, isRegister = false) => {
  let errors = {};
  if (!isRegister) {
    errors = validate(values, [
      'email',
      'firstName',
      'lastName',
      'confirmPassword',
    ]);
  } else {
    errors = validate(values);
  }
  return errors;
};

export { validate, validateAuth };
