import React from 'react';
import useStyles from './styles';
import { Typography } from '@material-ui/core';

const CardHeader = ({ title, action }) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography variant="h6" className={classes.headerTitle}>
        {title}
      </Typography>
      <div className={classes.action}>{action}</div>
    </div>
  );
};

export default CardHeader;
