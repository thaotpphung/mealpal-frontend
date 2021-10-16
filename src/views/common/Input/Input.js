import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from './styles';

const Input = ({
  name,
  handleChange,
  required = false,
  label,
  half,
  autoFocus = true,
  type = 'text',
  handleShowPassword,
  value,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        variant="standard"
        // variant="outlined"
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
};

Input.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string,
  half: PropTypes.bool,
  autoFocus: PropTypes.bool,
  type: PropTypes.string,
  handleShowPassword: PropTypes.func,
  value: PropTypes.string,
};

export default Input;
