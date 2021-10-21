const validateEmail = (name = 'email', value, errors) => {
  if (!value) {
    errors[name] = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    errors[name] = 'Email is invalid';
  }
};

const validatePassword = (name = 'password', value, errors) => {
  if (!value) {
    errors[name] = 'Password is required';
  } else if (value.length < 6) {
    errors['password'] = 'Password needs to be 6 characters or more';
  }
};

const validateConfirmPassword = (
  name = 'confirmPassword',
  value,
  errors,
  password
) => {
  if (!value) {
    errors[name] = 'Password is required';
  } else if (value !== password) {
    errors[name] = 'Password does not match';
  }
};

const validateTextField = (name, value, errors) => {
  console.log('validate', name, value);
  if (!value || value.trim() === '') {
    errors[name] = 'Field can not be empty';
  }
};

const validateArray = (name, value, errors) => {
  if (value.length === 1 && value[0] === '') {
    return errors;
  }
  const currentErrors = {};
  let hasError = false;
  value.map((item, idx) => {
    if (item.trim() === '') {
      currentErrors[idx] = 'Field cannot be empty';
      hasError = true;
    }
  });
  hasError ? (errors[name] = currentErrors) : void 0;
  return errors;
};

export {
  validateEmail,
  validatePassword,
  validateTextField,
  validateConfirmPassword,
  validateArray,
};
