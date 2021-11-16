import React from 'react';
import useStyles from './styles';

const CardBody = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.cardBody}>{children}</div>;
};

export default CardBody;
