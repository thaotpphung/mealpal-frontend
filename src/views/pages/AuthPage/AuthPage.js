import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { styles } from './styles';
import useStyles from '../../../containers/styles';

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import useForm from '../../../utils/hooks/useForm';
import FlashMessage from '../../common/FlashMessage/FlashMessage';
import { validateAuth } from '../../../utils/validations/validate';

import { signin, register } from '../../../redux/actions/userActions';

const initialState = {
  email: '',
  password: '',
};

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateAuth(form, isRegister));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      if (isRegister) {
        dispatch(register(form, history));
      } else {
        dispatch(signin(form, history));
      }
    }
  }, [errors]);

  const user = useSelector((state) => state.user);
  const { loading, currentUser, error } = user;
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const localStyles = styles();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (currentUser) {
      history.push('/');
    }
    return () => {};
  }, [currentUser]);

  const switchMode = () => {
    setIsRegister((prevIsRegister) => !prevIsRegister);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={localStyles.paper} elevation={3}>
        <Typography>
          {loading && <Spinner />}
          {error && <MuiAlert severity="error">{error}</MuiAlert>}
        </Typography>
        <Avatar className={localStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={localStyles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isRegister && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  error={errors?.firstName}
                  required
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  error={errors?.lastName}
                  required
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              error={errors?.email}
              required
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
              error={errors?.password}
              required
            />
            {isRegister && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
                error={errors?.confirmPassword}
                required
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.formSubmitButton}
          >
            {isRegister ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isRegister
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthPage;
