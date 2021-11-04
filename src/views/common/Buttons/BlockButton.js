import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const BlockButton = ({ type, handleClick, label = type, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      {...props}
      {...(type === 'submit' ? { type: 'submit' } : { onClick: handleClick })}
      fullWidth
      color="primary"
      variant="contained"
      className={`${classes[type] ? classes[type] : null} ${
        classes.blockButton
      }`}
    >
      {label}
    </Button>
  );
};

export default BlockButton;
