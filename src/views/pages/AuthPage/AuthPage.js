import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { styles } from './styles';
import useStyles from '../../../app/styles';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../../common/Input/Input';
import FlashMessage from '../../common/FlashMessage/FlashMessage';
import Spinner from '../../common/Spinner/Spinner';
import BlockButton from '../../common/Buttons/BlockButton';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import { validateAuth } from '../../../utils/validations/validate';
import { signin, register } from '../../../redux/actions/userActions';

const initialState = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  confirmPassword: '',
};

const AuthPage = () => {
  const user = useSelector((state) => state.user);
  const { loading, loggedInUser } = user;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const localClasses = styles();
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [isRegister, toggleIsRegister] = useToggle(
    location.isRedirect ? true : false
  );

  const {
    values: form,
    handleChange,
    handleSubmit,
    errors,
  } = useForm(initialState, () => {
    if (isRegister) {
      dispatch(register(form, history));
    } else {
      dispatch(signin(form, history));
    }
  });

  const handleSubmitAuth = (event) => {
    const errors = validateAuth(form, isRegister);
    handleSubmit(event, errors);
  };

  useEffect(() => {
    if (loggedInUser) {
      history.push('/');
    }
    return () => {};
  }, [loggedInUser]);

  const switchMode = () => {
    toggleIsRegister();
    toggleShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={localClasses.paper} elevation={3}>
        <div>{loading && <Spinner />}</div>
        <Avatar className={localClasses.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isRegister ? 'Sign up' : 'Sign in'}
        </Typography>
        <form className={localClasses.form} onSubmit={handleSubmitAuth}>
          <Grid container spacing={2}>
            {isRegister && (
              <>
                <Input
                  autoFocus={isRegister}
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  error={errors?.firstName}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  error={errors?.lastName}
                />
                <Input
                  name="email"
                  label="Email Address"
                  handleChange={handleChange}
                  type="email"
                  error={errors?.email}
                />
              </>
            )}
            <Input
              autoFocus={!isRegister}
              name="username"
              label="Username"
              handleChange={handleChange}
              error={errors?.username}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              endAction={
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              error={errors?.password}
            />
            {isRegister && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                endAction={
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                error={errors?.confirmPassword}
              />
            )}
          </Grid>
          <BlockButton type="submit">
            {isRegister ? 'Sign Up' : 'Sign In'}
          </BlockButton>
          <Grid container justifyContent="flex-end">
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
