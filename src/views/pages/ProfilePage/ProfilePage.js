import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import useStyles from '../../../app/styles';
import { useParams, useHistory } from 'react-router-dom';
import {
  Avatar,
  Paper,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import ListIcon from '@material-ui/icons/List';
import EmailIcon from '@material-ui/icons/Email';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import useEditMode from '../../../utils/hooks/useEditMode';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import BlockButton from '../../common/Buttons/BlockButton';
import { validate } from '../../../utils/validations/validate';
import { avatarOptions, initialAvatarForm } from '../../../constants/avatars';
import { updateUser, updatePassword } from '../../../redux/actions/userActions';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';
import CardHeader from '../../common/CardHeader/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { getUser, sendConfirmationEmail } from '../../../api/index';

const ProfilePage = () => {
  const { loading, loadingUpdate, loggedInUser, error } = useSelector(
    (state) => state.user
  );
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const localClasses = styles();
  const [isShowComponent, setIsShowComponent] = useState({ Profile: true });
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [currentUser, setCurrentUser] = useState({});
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(false);

  // fetch data
  useEffect(() => {
    if ((loggedInUser && loggedInUser._id !== userId) || !loggedInUser) {
      setLoadingCurrentUser(true);
      getUser(userId)
        .then(({ data }) => {
          setAvatarUrl(data.data.avatar);
          setCurrentUser(data.data);
        })
        .catch((error) => {
          history.push('/404');
          dispatch(addAlertWithTimeout('error', error.response.data.message));
        })
        .finally(() => setLoadingCurrentUser(false));
    } else {
      setCurrentUser(loggedInUser);
      setAvatarUrl(loggedInUser.avatar);
    }
  }, []);

  // menu
  const components = [
    {
      name: 'Profile',
      icon: <AccountCircleIcon />,
      public: true,
    },
    {
      name: 'Avatar',
      icon: <FaceIcon />,
    },
    {
      name: 'Password',
      icon: <LockIcon />,
    },
    {
      name: 'Contact',
      icon: <EmailIcon />,
    },
  ];

  const handleClickListItem = (param) => {
    setIsShowComponent({ [param]: true });
  };

  // profile
  const {
    openEditMode: openEditProfile,
    toggleOpenEditMode: toggleEditProfile,
    handleCloseEditMode: handleCloseEditProfile,
  } = useEditMode(() => {
    resetProfileForm();
    resetProfileErrors();
  });
  const {
    handleChange: handleChangeProfile,
    handleSubmit: handleSubmitChangeProfile,
    values: userForm,
    errors: profileErrors,
    reset: resetProfileForm,
    resetErrors: resetProfileErrors,
  } = useForm(
    {
      firstName: loggedInUser?.firstName,
      lastName: loggedInUser?.lastName,
      bio: loggedInUser?.bio,
      avatar: loggedInUser?.avatar,
      calories: loggedInUser?.calories,
      preferredDiet: loggedInUser?.preferredDiet,
    },
    () => {
      dispatch(updateUser(loggedInUser._id, userForm));
      toggleEditProfile(false);
    },
    validate,
    ['bio', 'avatar', 'calories', 'preferredDiet']
  );

  // password
  const {
    openEditMode: openEditPassword,
    toggleOpenEditMode: toggleEditPassword,
    handleCloseEditMode: handleCloseEditPassword,
  } = useEditMode(() => {
    resetPasswordErrors();
  });
  const passwordFields = [
    {
      name: 'oldPassword',
      label: 'Current Password',
    },
    {
      name: 'password',
      label: 'New Password',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm New Password',
    },
  ];
  const {
    handleChange: handleChangePassword,
    handleSubmit: handleSubmitChangePassword,
    values: passwordForm,
    errors: passwordErrors,
    resetErrors: resetPasswordErrors,
  } = useForm(
    {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    () => {
      dispatch(updatePassword(passwordForm));
      toggleEditPassword(false);
    },
    validate
  );

  // email
  const {
    openEditMode: openEditEmail,
    toggleOpenEditMode: toggleEditEmail,
    handleCloseEditMode: handleCloseEditEmail,
  } = useEditMode(() => {
    resetEmailForm();
    resetEmailErrors();
  });
  const {
    handleChange: handleChangeEmail,
    handleSubmit: handleSubmitChangeEmail,
    values: emailForm,
    errors: emailErrors,
    reset: resetEmailForm,
    resetErrors: resetEmailErrors,
  } = useForm(
    {
      email: loggedInUser?.email,
    },
    () => {
      dispatch(updateUser(loggedInUser._id, emailForm));
      toggleEditEmail(false);
    },
    validate
  );
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const handleSendConfirmationEmail = () => {
    setIsSendingEmail(true);
    sendConfirmationEmail()
      .then(({ data }) => {
        dispatch(addAlertWithTimeout('success', data.message));
      })
      .catch((error) => {
        dispatch(addAlertWithTimeout('error', error.response.data.message));
      })
      .finally(() => setIsSendingEmail(false));
  };

  // when user is updated or avatar is done updated, update state
  useEffect(() => {
    if (error === '') {
      setCurrentUser(loggedInUser);
      setAvatarUrl(loggedInUser.avatar);
    } else {
      resetEmailForm();
      resetProfileForm();
    }
  }, [loggedInUser, error]);

  // avatar
  const {
    openEditMode: openEditAvatar,
    toggleOpenEditMode: toggleEditAvatar,
    handleCloseEditMode: handleCloseEditAvatar,
  } = useEditMode(() => {
    handleCancelChangeAvatar();
  });
  const [avatarForm, setAvatarForm] = useState(initialAvatarForm);
  const [avatarUrl, setAvatarUrl] = useState('');
  const makeAvatarUrl = (updatedAvatarForm) => {
    let url = `https://avatars.dicebear.com/api/miniavs/${loggedInUser._id}.svg?`;
    Object.entries(updatedAvatarForm).forEach(([key, value]) => {
      if (value !== 'none') url += `${key}=${value}&`;
    });
    setAvatarUrl(url);
  };
  const handleChangeAvatar = (key, value) => {
    const updatedAvatarForm = { ...avatarForm, [key]: value };
    setAvatarForm(updatedAvatarForm);
    makeAvatarUrl(updatedAvatarForm);
  };
  const handleCancelChangeAvatar = () => {
    setAvatarUrl(loggedInUser.avatar);
    setAvatarForm(initialAvatarForm);
  };
  const handleSubmitChangeAvatar = (event) => {
    event.preventDefault();
    dispatch(updateUser(loggedInUser._id, { avatar: avatarUrl }));
    toggleEditAvatar(false);
  };

  if (!loadingCurrentUser && !loading && Object.keys(currentUser).length > 0)
    return (
      <div className={localClasses.root}>
        <Grid
          container
          alignItems="stretch"
          spacing={7}
          justifyContent="center"
        >
          <Grid item sm={12} md={4}>
            <Avatar className={localClasses.avatar} src={avatarUrl} />
            <Paper className={localClasses.paper}>
              <List component="nav">
                {!!loggedInUser && loggedInUser._id === userId ? (
                  <>
                    {components.map((component, componentIdx) => (
                      <ListItem
                        key={`component-${component.name}-${componentIdx}`}
                        button
                        onClick={() => handleClickListItem(component.name)}
                        selected={isShowComponent[component.name]}
                      >
                        <ListItemIcon>{component.icon}</ListItemIcon>
                        <ListItemText primary={component.name} />
                      </ListItem>
                    ))}
                  </>
                ) : (
                  <>
                    <ListItem
                      button
                      onClick={() => {
                        history.push(`/users/${userId}/weeks`);
                      }}
                    >
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="Meal Plans" />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        history.push(`/users/${userId}/recipes`);
                      }}
                    >
                      <ListItemIcon>
                        <RestaurantMenuIcon />
                      </ListItemIcon>
                      <ListItemText primary="Recipes" />
                    </ListItem>
                  </>
                )}
              </List>
            </Paper>
          </Grid>
          <Grid item sm={12} md={8} className={localClasses.rightColumn}>
            {isShowComponent['Profile'] && (
              <>
                <CardHeader
                  loading={loadingUpdate}
                  title={Object.keys(isShowComponent)[0]}
                  useEditMode={true}
                  useEditCondition={loggedInUser && userId === loggedInUser._id}
                  showEdit={openEditProfile}
                  handleOpenEdit={toggleEditProfile}
                  handleCloseEdit={handleCloseEditProfile}
                  handleDoneEdit={handleSubmitChangeProfile}
                />
                <Paper className={localClasses.form}>
                  <form className={classes.formContainer}>
                    <Grid container spacing={2}>
                      <Input
                        name="username"
                        label="Username"
                        value={currentUser.username}
                        disabled
                      />
                      {!openEditProfile ? (
                        <Input
                          label="Name"
                          value={`${currentUser.firstName} ${currentUser.lastName}`}
                          disabled
                        />
                      ) : (
                        <>
                          <Input
                            name="firstName"
                            label="First Name"
                            required
                            half
                            value={userForm.firstName}
                            handleChange={handleChangeProfile}
                            error={profileErrors?.firstName}
                            disabled={!openEditProfile}
                          />
                          <Input
                            name="lastName"
                            label="Last Name"
                            required
                            half
                            value={userForm.lastName}
                            handleChange={handleChangeProfile}
                            error={profileErrors?.lastName}
                            disabled={!openEditProfile}
                          />
                        </>
                      )}
                      <Input
                        name="preferredDiet"
                        label="Preferred Diet"
                        value={
                          !openEditProfile
                            ? currentUser.preferredDiet
                            : userForm.preferredDiet
                        }
                        handleChange={handleChangeProfile}
                        disabled={!openEditProfile}
                      />
                      <Input
                        name="calories"
                        label="Calories Goal"
                        type="number"
                        step={0.01}
                        value={
                          !openEditProfile
                            ? currentUser.calories
                            : userForm.calories
                        }
                        handleChange={handleChangeProfile}
                        disabled={!openEditProfile}
                      />
                      <Input
                        name="bio"
                        label="Bio"
                        value={
                          !openEditProfile ? currentUser.bio : userForm.bio
                        }
                        multiline
                        minRows={4}
                        handleChange={handleChangeProfile}
                        disabled={!openEditProfile}
                      />
                    </Grid>
                  </form>
                </Paper>
              </>
            )}
            {isShowComponent['Password'] && (
              <>
                <CardHeader
                  title={Object.keys(isShowComponent)[0]}
                  useEditMode={true}
                  useEditCondition={loggedInUser && userId === loggedInUser._id}
                  showEdit={openEditPassword}
                  handleOpenEdit={toggleEditPassword}
                  handleCloseEdit={handleCloseEditPassword}
                  handleDoneEdit={handleSubmitChangePassword}
                />
                <Paper className={localClasses.form}>
                  <form className={classes.formContainer}>
                    <Grid container spacing={2}>
                      {passwordFields.map((field, fieldIdx) => (
                        <Input
                          key={`password-field-${field.name}-${fieldIdx}`}
                          name={field.name}
                          label={field.label}
                          value={passwordForm[field.name]}
                          required
                          disabled={!openEditPassword}
                          handleChange={handleChangePassword}
                          error={passwordErrors[field.name]}
                          type={showPassword ? 'text' : 'password'}
                          endAction={
                            <IconButton onClick={toggleShowPassword}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          }
                        />
                      ))}
                    </Grid>
                  </form>
                </Paper>
              </>
            )}
            {isShowComponent['Avatar'] && (
              <>
                <CardHeader
                  title={Object.keys(isShowComponent)[0]}
                  useEditMode={true}
                  useEditCondition={loggedInUser && userId === loggedInUser._id}
                  showEdit={openEditAvatar}
                  handleOpenEdit={toggleEditAvatar}
                  handleCloseEdit={handleCloseEditAvatar}
                  handleDoneEdit={handleSubmitChangeAvatar}
                />
                <Paper className={localClasses.form}>
                  <form className={classes.formContainer}>
                    <Grid container spacing={2}>
                      {Object.entries(avatarOptions).map(
                        ([key, value], idx) => (
                          <Grid
                            key={`avatar-options-${key}-${idx}`}
                            item
                            xs={12}
                            sm={6}
                          >
                            <FormControl
                              style={{ width: '100%' }}
                              margin="dense"
                              variant="outlined"
                              size="small"
                              fullWidth
                              className={classes.formControl}
                              disabled={!openEditAvatar}
                            >
                              <InputLabel id={`${key}-label-${idx}`}>
                                {key}
                              </InputLabel>
                              <Select
                                width={100}
                                defaultValue=""
                                labelId={`${key}-label`}
                                value={avatarForm[key]}
                                label={key}
                                onChange={(e) =>
                                  handleChangeAvatar(key, e.target.value)
                                }
                              >
                                {value.map((item, itemIdx) => (
                                  <MenuItem
                                    key={`item-${item}-${itemIdx}`}
                                    value={item}
                                  >
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </form>
                </Paper>
              </>
            )}
            {isShowComponent['Contact'] && (
              <>
                <CardHeader
                  title={Object.keys(isShowComponent)[0]}
                  useEditMode={true}
                  useEditCondition={loggedInUser && userId === loggedInUser._id}
                  showEdit={openEditEmail}
                  handleOpenEdit={toggleEditEmail}
                  handleCloseEdit={handleCloseEditEmail}
                />
                <Paper className={localClasses.form}>
                  <div style={{ marginBottom: '10px' }}>
                    {loggedInUser.isVerified ? (
                      <Alert severity="success">
                        <AlertTitle>Verified Email</AlertTitle>
                      </Alert>
                    ) : (
                      <>
                        <Alert severity="warning">
                          <AlertTitle>Confirm your email</AlertTitle>
                          <Typography>
                            To enable emailing shopping list and forgot password
                            reset token
                          </Typography>
                        </Alert>
                        <BlockButton
                          handleClick={handleSendConfirmationEmail}
                          loading={isSendingEmail}
                        >
                          Send Confirmation
                        </BlockButton>
                      </>
                    )}
                  </div>
                  <form onSubmit={handleSubmitChangeEmail}>
                    {loggedInUser && userId === loggedInUser._id && (
                      <Input
                        name="email"
                        label="Email"
                        value={emailForm.email}
                        disabled={!openEditEmail}
                        handleChange={handleChangeEmail}
                        error={emailErrors['email']}
                      />
                    )}
                    {openEditEmail && (
                      <BlockButton
                        type="submit"
                        fullWidth
                        loading={loadingUpdate}
                      >
                        Submit
                      </BlockButton>
                    )}
                  </form>
                </Paper>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    );
  return <Spinner />;
};

export default ProfilePage;
