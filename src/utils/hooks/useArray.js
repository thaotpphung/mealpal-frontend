import { useState } from 'react';

const useArray = (initialState) => {
  const [array, setArray] = useState(initialState);

  function push(element) {
    setArray((a) => [...a, element]);
  }

  function filter(callback) {
    setArray((a) => a.filter(callback));
  }

  function update(index, newElement) {
    console.log('index', index, 'new element', newElement);
    setArray((a) => [
      ...a.slice(0, index),
      newElement,
      ...a.slice(index + 1, a.length),
    ]);
  }

  function addAt(index, newElement) {
    const newArray = [...array];
    newArray.splice(index + 1, 0, newElement);
    setArray(newArray);
  }

  function remove(index) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  function clear() {
    setArray([]);
  }

  function reset() {
    setArray(initialState);
  }

  return {
    array,
    set: setArray,
    push,
    filter,
    update,
    remove,
    clear,
    addAt,
    reset,
  };
};

export default useArray;
