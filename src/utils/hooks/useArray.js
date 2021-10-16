import { useState } from 'react';

const useArray = (defaultValue, handleSubmit) => {
  const [array, setArray] = useState(defaultValue);
  const [errors, setErrors] = useState();

  function push(element) {
    setArray((a) => [...a, element]);
  }

  function filter(callback) {
    setArray((a) => a.filter(callback));
  }

  function update(index, newElement) {
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function remove(index) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  function validate() {}

  return { array, set: setArray, push, filter, update, remove, clear };
};

export default useArray;
