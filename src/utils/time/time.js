const formatTime = (date) => {
  let newDate = new Date(date);
  newDate = newDate.toLocaleString('default', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  console.log('newdate', newDate);
  return newDate;
};

export { formatTime };
