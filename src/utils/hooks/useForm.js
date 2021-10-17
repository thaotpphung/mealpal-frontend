import { useState, useEffect } from 'react';

const useForm = (
  initialState,
  callback,
  validate = () => {
    return {};
  }
) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = name === 'weekTags' ? value.split(',') : value;
    setValues({
      ...values,
      [name]: formattedValue,
    });
  };

  const setValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event, arrayErrors = {}) => {
    event.preventDefault();
    setErrors(validate(values));
    setErrors((prevErrors) => ({ ...prevErrors, ...arrayErrors }));
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
  };
};

export default useForm;
