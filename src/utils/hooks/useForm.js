import { useState, useEffect } from 'react';

const useForm = (initialState, callback) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = name === 'weekTags' ? value.split(',') : value;
    setValues({
      ...values,
      [name]: formattedValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  const reset = () => {
    setValues(initialState);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    reset,
  };
};

export default useForm;
