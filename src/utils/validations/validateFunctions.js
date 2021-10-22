const validateField = (name, value, errors, password = null) => {
  if (!value) {
    errors[name] = 'This field is required';
  }
  switch (name) {
    case 'email': {
      if (!/\S+@\S+\.\S+/.test(value)) {
        errors[name] = 'Email is invalid';
      }
      break;
    }
    case 'password': {
      if (value.length < 6) {
        errors[name] = 'Password needs to be 6 characters or more';
      }
      break;
    }
    case 'confirmPassword': {
      if (value !== password) {
        errors[name] = 'Password does not match';
      }
      break;
    }
    default:
      break;
  }
  return errors;
};

const validateTextField = (name, value, errors) => {
  console.log(name, value);
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

export { validateTextField, validateArray, validateField };
