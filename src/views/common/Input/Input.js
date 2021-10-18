import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './styles';

const Input = ({
  name,
  handleChange,
  required = false,
  label,
  half,
  autoFocus = true,
  type = 'text',
  endAction,
  value,
  error,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        variant="standard"
        className={classes.inputField}
        name={name}
        onChange={handleChange}
        required={required}
        margin="dense"
        fullWidth
        label={error ? error : label}
        value={value}
        autoFocus={autoFocus}
        type={type}
        error={!!error}
        InputProps={
          endAction
            ? {
                endAdornment: (
                  <InputAdornment position="end">{endAction}</InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  handleShowPassword: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
