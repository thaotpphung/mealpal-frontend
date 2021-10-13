import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
  value,
}) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      onChange={handleChange}
      // variant="outlined"
      // required
      fullWidth
      label={label}
      value={value}
      autoFocus={autoFocus}
      type={type}
      InputProps={
        name === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : null
      }
    />
  </Grid>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  half: PropTypes.bool,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  handleShowPassword: PropTypes.func,
  value: PropTypes.string,
};

export default Input;
