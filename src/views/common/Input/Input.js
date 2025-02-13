import React from 'react';
import { TextField, Grid, InputAdornment } from '@material-ui/core';
import useStyles from './styles';

const Input = ({
  name,
  handleChange,
  required = false,
  label,
  half,
  type = 'text',
  endAction,
  value,
  error,
  disabled = false,
  min = 0,
  max = 10000,
  step = 0.01,
  inputProps,
  helperText = error,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        variant="outlined"
        size="small"
        className={classes.inputField}
        name={name}
        onChange={handleChange}
        required={required}
        margin="dense"
        fullWidth
        label={label}
        value={value}
        type={type}
        helperText={helperText}
        error={error !== undefined}
        disabled={disabled}
        InputProps={{
          endAdornment: endAction ? (
            <InputAdornment position="end">{endAction}</InputAdornment>
          ) : null,
        }}
        inputProps={{
          min: min,
          max: max,
          step: step,
          ...inputProps,
        }}
        {...rest}
      />
    </Grid>
  );
};

export default Input;
