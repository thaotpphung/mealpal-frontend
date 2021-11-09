import React from 'react';
import useStyles from './styles';
import Typography from '@material-ui/core/Typography';
import CartIcon from '../../../assets/icons/notice.svg';

const FlashMessage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img src={CartIcon} className={classes.logo} />
      <Typography variant="h6">No item to display</Typography>
    </div>
  );
};

export default FlashMessage;
