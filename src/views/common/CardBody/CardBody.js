import React from 'react';
import useStyles from './styles';
import { Paper } from '@material-ui/core';

const CardBody = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.cardBody}>{children}</div>;
};

export default CardBody;
