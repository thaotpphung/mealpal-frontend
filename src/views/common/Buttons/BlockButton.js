import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const BlockButton = ({
  color = 'primary',
  variant = 'contained',
  type,
  handleClick,
  fullWidth,
  width = fullWidth ? '100%' : 'fit-content',
  children,
  loading = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.blockButtonWrapper}>
      <Button
        disabled={loading}
        {...props}
        {...(type === 'submit' ? { type: 'submit' } : { onClick: handleClick })}
        style={{ width: width }}
        color={color}
        variant={variant}
        className={`${classes[type] ? classes[type] : null} ${
          classes.blockButton
        }`}
      >
        {loading && (
          <CircularProgress
            size={24}
            className={classes.buttonProgress}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -12,
              marginLeft: -12,
            }}
          />
        )}
        {children}
      </Button>
    </div>
  );
};

export default BlockButton;
