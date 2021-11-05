import { useState, useEffect } from 'react';

const useForm = (
  initialState,
  callback,
  validate = () => {
    return {};
  },
  optionalFields = []
) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [callBackParams, setCallBackParams] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const setValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event, otherErrors = {}, otherParams = []) => {
    event.preventDefault();
    console.log('erorrs before otehr errors', validate(values, optionalFields));
    console.log('other errors', otherErrors);
    setErrors({
      ...validate(values, optionalFields),
      ...otherErrors,
    });
    setCallBackParams(otherParams);
    setIsSubmitting(true);
  };

  const reset = () => {
    setValues(initialState);
  };

  useEffect(() => {
    console.log('error changes', errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(...callBackParams);
    }
  }, [errors, callBackParams]);

  return {
    handleChange,
    handleSubmit,
    values,
    reset,
    setValue,
    errors,
    setErrors,
    setValues,
  };
};

export default useForm;
