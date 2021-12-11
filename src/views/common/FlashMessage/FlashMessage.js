import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const FlashMessage = () => {
  const classes = useStyles();
  const { alerts } = useSelector((state) => state.alertList);

  if (!alerts || Object.values(alerts).length === 0) {
    return null;
  }

  return (
    <>
      {Object.values(alerts).map((alert, alertIdx) => (
        <Alert
          key={`alert-${alert.status}-${alertIdx}`}
          className={classes.message}
          severity={alert.status}
        >
          <Typography>{alert.message}</Typography>
        </Alert>
      ))}
    </>
  );
};

export default FlashMessage;
