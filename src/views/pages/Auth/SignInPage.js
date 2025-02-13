import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { styles } from './styles';
import { Button, Grid, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '../../common/Input/Input';
import BlockButton from '../../common/Buttons/BlockButton';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import { validate } from '../../../utils/validations/validate';
import { signin } from '../../../redux/actions/userActions';
import AuthCardContainer from './AuthCardContainer';

const initialState = {
  username: '',
  password: '',
};

const SignInPage = () => {
  const user = useSelector((state) => state.user);
  const { loading, loggedInUser } = user;
  const dispatch = useDispatch();
  const history = useHistory();
  const localClasses = styles();
  const [showPassword, toggleShowPassword] = useToggle(false);

  const {
    values: form,
    handleChange,
    handleSubmit,
    errors,
  } = useForm(
    initialState,
    () => {
      dispatch(signin(form, history));
    },
    validate
  );

  useEffect(() => {
    if (loggedInUser) {
      history.push('/');
    }
    return () => {};
  }, [loggedInUser]);

  return (
    <AuthCardContainer title="Sign In">
      <form className={localClasses.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input
            autoFocus
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
        </Grid>
        <BlockButton type="submit" fullWidth loading={loading}>
          Sign In
        </BlockButton>
        <Grid container justifyContent="flex-end">
          <Button onClick={() => history.push('/signup')}>
            Don&apos;t have an account? Sign Up
          </Button>
          <Button onClick={() => history.push('/password/reset')}>
            Forgot Password
          </Button>
        </Grid>
      </form>
    </AuthCardContainer>
  );
};

export default SignInPage;
