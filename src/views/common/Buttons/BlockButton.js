import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './styles';

const BlockButton = ({
  color = 'primary',
  variant = 'contained',
  type,
  handleClick,
  fullWidth,
  width = fullWidth ? '100%' : 'fit-content',
  children,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Button
      {...props}
      {...(type === 'submit' ? { type: 'submit' } : { onClick: handleClick })}
      style={{ width: width }}
      color={color}
      variant={variant}
      className={`${classes[type] ? classes[type] : null} ${
        classes.blockButton
      }`}
    >
      {children}
    </Button>
  );
};

export default BlockButton;
