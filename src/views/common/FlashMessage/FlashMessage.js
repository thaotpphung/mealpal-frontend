import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

const FlashMessage = ({ status, message }) => (
  <Alert sx={{ width: '50%', margin: '20px auto' }} severity={status}>
    {message}
  </Alert>
);

export default FlashMessage;
