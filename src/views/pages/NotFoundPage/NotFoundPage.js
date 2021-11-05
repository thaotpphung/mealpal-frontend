import React from 'react';
import { Typography, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';

const NotFoundPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h1">404</Typography>
      </div>
      <div className={classes.rightColumn}>
        <Typography variant="h3">Sorry</Typography>
        <Typography variant="h5">
          The page you&apos;re looking for was not found
        </Typography>
        <Button variant="contained" color="primary" onClick={goBack}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
