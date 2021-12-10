import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './styles';

const Spinner = ({ ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.spinner}>
      <CircularProgress {...rest} />
    </div>
  );
};

export default Spinner;
