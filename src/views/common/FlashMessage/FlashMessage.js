import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const FlashMessage = ({ severity, title, message }) => (
  <Alert sx={{ width: '50%', margin: '20px auto' }} severity={severity}>
    <AlertTitle>{title}</AlertTitle>
    {message}
  </Alert>
);

export default FlashMessage;
