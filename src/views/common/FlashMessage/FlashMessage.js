import React from 'react';
import { useSelector } from 'react-redux';

import { Alert } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const FlashMessage = () => {
  const { alerts } = useSelector((state) => state.alertList);
  const classes = useStyles();
  if (!alerts || Object.values(alerts).length === 0) {
    return null;
  }
  return (
    <>
      {Object.values(alerts).map((alert, alertIdx) => (
        <Alert
          key={`alert-${alert.message}-${alertIdx}`}
          className={classes.flashMessage}
          severity={alert.status}
        >
          <Typography>{alert.message}</Typography>
        </Alert>
      ))}
    </>
  );
};

export default FlashMessage;
