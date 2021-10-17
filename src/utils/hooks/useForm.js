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

  const handleSubmit = (event, otherErrors = {}) => {
    event.preventDefault();
    setErrors(validate(values, optionalFields));
    setErrors((prevErrors) => ({ ...prevErrors, ...otherErrors }));
    setIsSubmitting(true);
  };

  const reset = () => {
    setValues(initialState);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

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
