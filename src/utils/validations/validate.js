import { validateField, validateArray } from './validateFunctions';

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

const validateIngredients = (ingredients, errors) => {
  const regex = /^\d{1,3}(?: [1-9]\d{0,2}\/[1-9]\d{0,2})?$/;
  validateArray('ingredients', ingredients, errors, (item) => {
    return (
      !item.amount.toString.trim() ||
      !regex.test(item.amount.toString.trim()) ||
      !item.unit.label ||
      !item.ingredientName ||
      item.ingredientName.trim() === ''
    );
  });
  return errors;
};

export { validate, validateAuth, validateIngredients };
