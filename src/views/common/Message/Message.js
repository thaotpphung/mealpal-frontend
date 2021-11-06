import React from 'react';
import { Alert } from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import useStyles from './styles';

const Message = ({ severity, message }) => {
  const classes = useStyles();

  return (
    <Alert className={classes.message} severity={severity}>
      <Typography>{message}</Typography>
    </Alert>
  );
};

export default Message;
