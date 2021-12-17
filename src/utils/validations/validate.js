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

const validateAmount = (amount) => {
  const regex = /^(\d{1,5})(?: [1-9]\d{0,2}\/[1-9]\d{0,2})?$/;
  const regex2 = /^[1-9]\d{0,2}\/[1-9]\d{0,2}$/;
  return regex.test(amount) || regex2.test(amount);
};
export { validate, validateAmount };
