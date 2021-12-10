import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { styles } from './styles';
import { Grid, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '../../common/Input/Input';
import BlockButton from '../../common/Buttons/BlockButton';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import { validate } from '../../../utils/validations/validate';
import { resetPassword } from '../../../redux/actions/userActions';
import AuthCardContainer from './AuthCardContainer';

const initialState = {
  password: '',
  confirmPassword: '',
};

const ResetPasswordPage = () => {
  const user = useSelector((state) => state.user);
  const { loading, loggedInUser } = user;
  const dispatch = useDispatch();
  const { token } = useParams();
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
      dispatch(resetPassword(form, token));
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
    <AuthCardContainer title="Reset Password">
      <form className={localClasses.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
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
        </Grid>
        <BlockButton type="submit" fullWidth loading={loading}>
          Submit
        </BlockButton>
      </form>
    </AuthCardContainer>
  );
};

export default ResetPasswordPage;
