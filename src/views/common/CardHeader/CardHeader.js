import React from 'react';
import useStyles from './styles';

const CardHeader = ({ title, action }) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <div>{title}</div>
      <div className={classes.action}>{action}</div>
    </div>
  );
};

export default CardHeader;
