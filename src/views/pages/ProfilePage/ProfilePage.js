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
import CardBody from '../../common/CardBody/CardBody';
import RoundButton from '../../common/Buttons/RoundButton';
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
import {
  getUser,
  sendConfirmationEmail,
  confirmEmail,
} from '../../../api/index';

const ProfilePage = () => {
  const { loading, loggedInUser } = useSelector((state) => state.user);
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const localClasses = styles();
  const [isShowComponent, setIsShowComponent] = useState({ Profile: true });
  const [showPassword, toggleShowPassword] = useToggle(false);

  const {
    openEditMode: openEditProfile,
    toggleOpenEditMode: toggleEditProfile,
    handleCloseEditMode: handleCloseEditProfile,
  } = useEditMode(() => {
    resetProfileForm();
  });

  const {
    openEditMode: openEditAvatar,
    toggleOpenEditMode: toggleEditAvatar,
    handleCloseEditMode: handleCloseEditAvatar,
  } = useEditMode(() => {
    handleCancelChangeAvatar();
  });

  const {
    openEditMode: openEditPassword,
    toggleOpenEditMode: toggleEditPassword,
    handleCloseEditMode: handleCloseEditPassword,
  } = useEditMode(() => {});

  const {
    openEditMode: openEditEmail,
    toggleOpenEditMode: toggleEditEmail,
    handleCloseEditMode: handleCloseEditEmail,
  } = useEditMode(() => {
    resetEmailForm();
  });

  const [currentUser, setCurrentUser] = useState({});
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(false);

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

  const {
    handleChange,
    handleSubmit,
    values: userForm,
    errors,
    reset: resetProfileForm,
  } = useForm(
    {
      firstName: loggedInUser?.firstName,
      lastName: loggedInUser?.lastName,
      bio: loggedInUser?.bio,
      avatar: loggedInUser?.avatar,
      caloGoal: loggedInUser?.caloGoal,
      preferredDiet: loggedInUser?.preferredDiet,
    },
    () => {
      dispatch(updateUser(loggedInUser._id, userForm));
    }
  );

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
  } = useForm(
    {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    () => {
      dispatch(updatePassword(loggedInUser._id, passwordForm));
    },
    validate
  );

  const {
    handleChange: handleChangeEmail,
    handleSubmit: handleSubmitChangeEmail,
    values: emailForm,
    errors: emailErrors,
    reset: resetEmailForm,
  } = useForm(
    {
      email: loggedInUser?.email,
    },
    () => {
      dispatch(updateUser(loggedInUser._id, emailForm));
    },
    validate
  );

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
  };

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

  if (!loadingCurrentUser && !loading && Object.keys(currentUser).length > 0)
    return (
      <div className={localClasses.root}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={7}
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
                  title={Object.keys(isShowComponent)[0]}
                  useEditMode={true}
                  useEditCondition={loggedInUser && userId === loggedInUser._id}
                  showEdit={openEditProfile}
                  handleOpenEdit={toggleEditProfile}
                  handleCloseEdit={handleCloseEditProfile}
                />
                <Paper className={localClasses.form}>
                  <form
                    className={classes.formContainer}
                    onSubmit={handleSubmit}
                  >
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
                            handleChange={handleChange}
                            errors={errors?.firstName}
                            disabled={!openEditProfile}
                          />
                          <Input
                            name="lastName"
                            label="Last Name"
                            required
                            half
                            value={userForm.lastName}
                            handleChange={handleChange}
                            errors={errors?.lastName}
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
                        handleChange={handleChange}
                        errors={errors?.preferredDiet}
                        disabled={!openEditProfile}
                      />
                      <Input
                        name="caloGoal"
                        label="Calories Goal"
                        type="number"
                        step={0.01}
                        value={
                          !openEditProfile
                            ? currentUser.caloGoal
                            : userForm.caloGoal
                        }
                        handleChange={handleChange}
                        errors={errors?.caloGoal}
                        disabled={!openEditProfile}
                      />
                      <Input
                        name="bio"
                        label="Bio"
                        value={
                          !openEditProfile ? currentUser.bio : userForm.bio
                        }
                        multiline
                        rows={4}
                        handleChange={handleChange}
                        errors={errors?.bio}
                        disabled={!openEditProfile}
                      />
                      {openEditProfile && (
                        <BlockButton type="submit" fullWidth>
                          Submit
                        </BlockButton>
                      )}
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
                />
                <Paper className={localClasses.form}>
                  <form
                    className={classes.formContainer}
                    onSubmit={handleSubmitChangePassword}
                  >
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
                      {openEditPassword && (
                        <BlockButton type="submit" fullWidth>
                          Submit
                        </BlockButton>
                      )}
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
                />
                <Paper className={localClasses.form}>
                  <form
                    className={classes.formContainer}
                    onSubmit={handleSubmitChangeAvatar}
                  >
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
                      {openEditAvatar && (
                        <BlockButton type="submit" fullWidth>
                          Submit
                        </BlockButton>
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
                          disabled={isSendingEmail}
                        >
                          {isSendingEmail ? <Spinner /> : 'Send Confirmation'}
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
                      <BlockButton type="submit" fullWidth>
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
