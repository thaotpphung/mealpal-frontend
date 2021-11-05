import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import useStyles from '../../../containers/styles';
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
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import useEditMode from '../../../utils/hooks/useEditMode';
import Input from '../../common/Input/Input';
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
import { getUser } from '../../../api/index';

const ProfilePage = () => {
  const { loading, currentUser } = useSelector((state) => state.user);
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const localClasses = styles();
  const [isShowComponent, setIsShowComponent] = useState({ Profile: true });
  const [showPassword, toggleShowPassword] = useToggle(false);
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      isShowComponent.Profile && resetProfileForm();
      isShowComponent.Avatar && handleCancelChangeAvatar();
    }
  );
  const [loadingOtherUser, setLoadingOtherUser] = useState(false);

  useEffect(() => {
    if (currentUser._id !== userId) {
      setLoadingOtherUser(true);
      getUser(userId)
        .then(({ data }) => {
          setAvatarUrl(data.data.avatar);
          setValues({ ...data.data, userName: data.data.username });
        })
        .catch((error) => {
          history.push('/404');
          dispatch(addAlertWithTimeout('error', error.response.data.message));
        })
        .finally(() => setLoadingOtherUser(false));
    }
  }, []);

  const {
    firstName,
    lastName,
    bio,
    avatar,
    caloGoal,
    preferredDiet,
    username,
  } = currentUser;

  const {
    handleChange,
    handleSubmit,
    values: userForm,
    errors,
    setValues,
    reset: resetProfileForm,
  } = useForm(
    { firstName, lastName, bio, avatar, caloGoal, preferredDiet, username },
    () => {
      dispatch(updateUser(currentUser._id, userForm));
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
      dispatch(updatePassword(currentUser._id, passwordForm));
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
      name: 'Security',
      icon: <LockIcon />,
    },
    {
      name: 'Avatar',
      icon: <FaceIcon />,
    },
  ];

  const handleClickListItem = (param) => {
    setIsShowComponent({ [param]: true });
  };

  const [avatarForm, setAvatarForm] = useState(initialAvatarForm);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar);

  const makeAvatarUrl = (updatedAvatarForm) => {
    let url = `https://avatars.dicebear.com/api/miniavs/${currentUser._id}.svg?`;
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
    setAvatarUrl(currentUser.avatar);
    setAvatarForm(initialAvatarForm);
  };

  const handleSubmitChangeAvatar = (event) => {
    event.preventDefault();
    dispatch(updateUser(currentUser._id, { avatar: avatarUrl }));
  };

  if (!loadingOtherUser && !loading && Object.keys(currentUser).length > 0)
    return (
      <div className={localClasses.root}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={7}
        >
          <Grid item xs={12} sm={4}>
            <Avatar className={localClasses.avatar} src={avatarUrl} />
            {currentUser._id === userId && (
              <Paper className={localClasses.paper}>
                <List component="nav">
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
                </List>
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={8} className={localClasses.rightColumn}>
            <CardHeader
              title={Object.keys(isShowComponent)[0]}
              action={
                <>
                  {userId === currentUser._id && (
                    <>
                      {openEditMode ? (
                        <RoundButton
                          type={'cancel'}
                          handleClick={handleCloseEditMode}
                        />
                      ) : (
                        <RoundButton
                          type={'edit'}
                          handleClick={toggleOpenEditMode}
                        />
                      )}
                    </>
                  )}
                </>
              }
            />
            <Paper className={localClasses.form}>
              {isShowComponent.Profile && (
                <form className={classes.formContainer} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {userId === currentUser._id && (
                      <Input label="Email" value={currentUser.email} disabled />
                    )}
                    <Input
                      name="username"
                      label="Username"
                      value={userForm.username}
                      disabled
                    />
                    <Input
                      name="firstName"
                      label="First Name"
                      required
                      half
                      value={userForm.firstName}
                      handleChange={handleChange}
                      errors={errors?.firstName}
                      disabled={!openEditMode}
                    />
                    <Input
                      name="lastName"
                      label="Last Name"
                      required
                      half
                      value={userForm.lastName}
                      handleChange={handleChange}
                      errors={errors?.lastName}
                      disabled={!openEditMode}
                    />
                    <Input
                      name="preferredDiet"
                      label="Preferred Diet"
                      value={userForm.preferredDiet}
                      handleChange={handleChange}
                      errors={errors?.preferredDiet}
                      disabled={!openEditMode}
                    />
                    <Input
                      name="caloGoal"
                      label="Calories Goal"
                      type="number"
                      value={userForm.caloGoal}
                      handleChange={handleChange}
                      errors={errors?.caloGoal}
                      disabled={!openEditMode}
                    />
                    <Input
                      name="bio"
                      label="Bio"
                      value={userForm.bio}
                      multiline
                      rows={4}
                      handleChange={handleChange}
                      errors={errors?.bio}
                      disabled={!openEditMode}
                    />
                    {userId === currentUser._id && (
                      <BlockButton type="submit" />
                    )}
                  </Grid>
                </form>
              )}
              {isShowComponent.Security && (
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
                        disabled={!openEditMode}
                        handleChange={handleChangePassword}
                        error={passwordErrors[field.name]}
                        type={showPassword ? 'text' : 'password'}
                        endAction={
                          <IconButton onClick={toggleShowPassword}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        }
                      />
                    ))}
                    <BlockButton type="submit" />
                  </Grid>
                </form>
              )}
              {isShowComponent.Avatar && (
                <form
                  className={classes.formContainer}
                  onSubmit={handleSubmitChangeAvatar}
                >
                  <Grid container spacing={2}>
                    {Object.entries(avatarOptions).map(([key, value], idx) => (
                      <Grid
                        key={`avatar-options-${key}-${idx}`}
                        item
                        xs={12}
                        sm={6}
                      >
                        <FormControl
                          margin="dense"
                          variant="outlined"
                          size="small"
                          fullWidth
                          className={classes.formControl}
                          disabled={!openEditMode}
                        >
                          <InputLabel id={`${key}-label`}>{key}</InputLabel>
                          <Select
                            defaultValue=""
                            labelId={`${key}-label`}
                            value={avatarForm[key]}
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
                    ))}
                    <BlockButton type="submit" />
                  </Grid>
                </form>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  return <Spinner />;
};

export default ProfilePage;
