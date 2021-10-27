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
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import Input from '../../common/Input/Input';
import { validate } from '../../../utils/validations/validate';
import { updateUser, updatePassword } from '../../../redux/actions/userActions';
import CardHeader from '../../common/CardHeader/CardHeader';

const ProfilePage = () => {
  const { loading, currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const localClasses = styles();
  const [isShowComponent, setIsShowComponent] = useState({ Profile: true });
  const [showPassword, toggleShowPassword] = useToggle(false);

  const {
    handleChange,
    handleSubmit,
    values: userForm,
    errors,
  } = useForm(
    {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      bio: currentUser?.bio,
    },
    () => {
      dispatch(updateUser(currentUser._id, userForm));
    },
    validate,
    ['bio']
  );

  const {
    handleChange: handleChangePassword,
    handleSubmit: handleSubmitChangePassword,
    values: passwordForm,
    errors: passwordErrors,
  } = useForm(
    {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    () => {
      dispatch(updatePassword(currentUser._id, passwordForm));
    },
    validate
  );

  const handleClickListItem = (param) => {
    setIsShowComponent({ [param]: true });
  };

  return (
    <div className={localClasses.root}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={7}
      >
        <Grid item xs={12} sm={4}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className={localClasses.avatar}
          />
          <Paper className={localClasses.paper}>
            <List component="nav">
              <ListItem
                button
                onClick={() => handleClickListItem('Profile')}
                selected={isShowComponent.Profile}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleClickListItem('Security')}
                selected={isShowComponent.Security}
              >
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} className={localClasses.rightColumn}>
          <CardHeader title={Object.keys(isShowComponent)[0]} />
          <Paper className={localClasses.form}>
            {isShowComponent.Profile && (
              <form className={classes.formContainer} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Input label="Email" value={currentUser.email} disabled />
                  <Input
                    name="username"
                    label="Username"
                    value={currentUser.username}
                    disabled
                  />
                  <Input
                    name="firstName"
                    label="First Name"
                    half
                    value={userForm.firstName}
                    handleChange={handleChange}
                    errors={errors?.firstName}
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    half
                    value={userForm.lastName}
                    handleChange={handleChange}
                    errors={errors?.lastName}
                  />
                  <Input
                    name="bio"
                    label="Bio"
                    value={userForm.bio}
                    multiline
                    rows={4}
                    handleChange={handleChange}
                    errors={errors?.bio}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.formSubmitButton}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            )}
            {isShowComponent.Security && (
              <form
                className={classes.formContainer}
                onSubmit={handleSubmitChangePassword}
              >
                <Grid container spacing={2}>
                  <Input
                    name="oldPassword"
                    label="Old Password"
                    value={passwordForm.oldPassword}
                    handleChange={handleChangePassword}
                    type={showPassword ? 'text' : 'password'}
                    error={passwordErrors?.oldPassword}
                    endAction={
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                  <Input
                    name="password"
                    label="New Password"
                    value={passwordForm.password}
                    handleChange={handleChangePassword}
                    error={passwordErrors?.password}
                    type={showPassword ? 'text' : 'password'}
                    endAction={
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                  <Input
                    name="confirmPassword"
                    label="Confirm New Password"
                    value={passwordForm.confirmPassword}
                    handleChange={handleChangePassword}
                    error={passwordErrors?.confirmPassword}
                    type={showPassword ? 'text' : 'password'}
                    endAction={
                      <IconButton onClick={toggleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    }
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.formSubmitButton}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
