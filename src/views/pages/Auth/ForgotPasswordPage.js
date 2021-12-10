import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { Avatar, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../../common/Input/Input';
import BlockButton from '../../common/Buttons/BlockButton';
import useForm from '../../../utils/hooks/useForm';
import { validate } from '../../../utils/validations/validate';
import { forgotPassword } from '../../../api/index';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';
import AuthCardContainer from './AuthCardContainer';

const initialState = {
  email: '',
};

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const localClasses = styles();

  const {
    values: form,
    handleChange,
    handleSubmit,
    errors,
  } = useForm(
    initialState,
    async () => {
      setLoading(true);
      forgotPassword(form)
        .then(({ data }) => {
          dispatch(addAlertWithTimeout('success', data.message));
        })
        .catch((error) => {
          dispatch(addAlertWithTimeout('error', error.response.data.message));
        })
        .finally(() => {
          setLoading(false);
        });
    },
    validate
  );

  return (
    <AuthCardContainer title="Forgot Password">
      <form className={localClasses.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Input
            autoFocus
            name="email"
            label="Email"
            handleChange={handleChange}
            error={errors.email}
          />
        </Grid>
        <BlockButton type="submit" fullWidth loading={loading}>
          Continue
        </BlockButton>
      </form>
    </AuthCardContainer>
  );
};

export default ForgotPasswordPage;
