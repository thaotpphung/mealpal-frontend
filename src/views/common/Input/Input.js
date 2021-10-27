import React from 'react';
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  He,
} from '@material-ui/core';
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
  disabled = false,
  readOnly = false,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        {...rest}
        variant="outlined"
        className={classes.inputField}
        name={name}
        onChange={handleChange}
        required={required}
        margin="dense"
        fullWidth
        label={label}
        value={value}
        autoFocus={autoFocus}
        type={type}
        helperText={error}
        error={!!error}
        disabled={disabled}
        InputProps={{
          endAdornment: endAction ? (
            <InputAdornment position="end">{endAction}</InputAdornment>
          ) : null,
          readOnly: readOnly,
        }}
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
