import React from 'react';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import Message from '../Message/Message';

const FlashMessage = () => {
  const { alerts } = useSelector((state) => state.alertList);
  const classes = useStyles();
  if (!alerts || Object.values(alerts).length === 0) {
    return null;
  }
  return (
    <>
      {Object.values(alerts).map((alert, alertIdx) => (
        <Message
          key={`alert-${alert.status}-${alertIdx}`}
          severity={alert.status}
          message={alert.message}
        />
      ))}
    </>
  );
};

export default FlashMessage;
