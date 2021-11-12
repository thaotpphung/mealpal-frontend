import React from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import NotFoundLogo from '../../../assets/undraw_not_found_2.svg';
import BlockButton from '../../../views/common/Buttons/BlockButton';

const NotFoundPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <div className={classes.leftColumn}>
        {/* <Typography variant="h1">404</Typography> */}
        <img src={NotFoundLogo} alt="Not Found Logo" className={classes.logo} />
      </div>
      <div className={classes.rightColumn}>
        <Typography variant="h3">Sorry</Typography>
        <Typography variant="h5">
          The page you&apos;re looking for was not found
        </Typography>
        <BlockButton handleClick={goBack}>Go Back</BlockButton>
      </div>
    </div>
  );
};

export default NotFoundPage;
