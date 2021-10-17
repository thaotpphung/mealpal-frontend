import { useState } from 'react';
import { validateArray } from '../../../utils/validations/validateFunctions';

const useArrayValidation = (values, name, key) => {
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const error = {};
    const formattedValues = values.map((value) => value[key]);
    setErrors(validateArray(name, formattedValues, error)[name]);
  };

  return { validate, errors };
};

export default useArrayValidation;
