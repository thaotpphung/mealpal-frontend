import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { styles } from './styles';
import useStyles from '../../../containers/styles';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FaceIcon from '@material-ui/icons/Face';
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useForm from '../../../utils/hooks/useForm';
import useToggle from '../../../utils/hooks/useToggle';
import Input from '../../common/Input/Input';
import RoundButton from '../../common/Buttons/RoundButton';
import { validate } from '../../../utils/validations/validate';
import { updateUser, updatePassword } from '../../../redux/actions/userActions';
import CardHeader from '../../common/CardHeader/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const ProfilePage = () => {
  const { loading, currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
      avatar: currentUser?.avatar,
    },
    () => {
      dispatch(updateUser(currentUser._id, userForm));
    }
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

  const initialAvatarForm = {
    gender: 'none',
    head: 'none',
    body: 'none',
    hair: 'none',
    mouth: 'none',
    eyes: 'none',
    skinColor: 'none',
    hairColor: 'none',
    bodyColor: 'none',
    glassesProbability: 'none',
    mustacheProbability: 'none',
    blushesProbability: 'none',
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

  const avatarOptions = {
    head: ['normal', 'wide', 'thin', 'none'],
    body: ['tShirt', 'golf', 'none'],
    hair: [
      'balndess',
      'slaughter',
      'ponyTail',
      'long',
      'curly',
      'stylish',
      'elvis',
      'classic02',
      'classic01',
      'none',
    ],
    mouth: ['default', 'missingTooth', 'none'],
    eyes: ['normal', 'confident', 'happy', 'none'],
    skinColor: ['yellow', 'white', 'dark', 'none'],
    hairColor: ['brown', 'black', 'red', 'none'],
    bodyColor: ['orange', 'blue', 'pink', 'none'],
    glassesProbability: [0, 100, 'none'],
    mustacheProbability: [0, 100, 'none'],
    blushesProbability: [0, 100, 'none'],
  };

  const components = [
    {
      name: 'Profile',
      icon: <AccountCircleIcon />,
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
                    required
                    half
                    value={userForm.firstName}
                    handleChange={handleChange}
                    errors={errors?.firstName}
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    required
                    half
                    value={userForm.lastName}
                    handleChange={handleChange}
                    errors={errors?.lastName}
                  />
                  <Input
                    name="preferredDiet"
                    label="Preferred Diet"
                    value={userForm.preferredDiet}
                    handleChange={handleChange}
                    errors={errors?.preferredDiet}
                  />
                  <Input
                    name="caloGoal"
                    label="Calories Goal"
                    type="number"
                    value={userForm.caloGoal}
                    handleChange={handleChange}
                    errors={errors?.caloGoal}
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
                  {passwordFields.map((field, fieldIdx) => (
                    <Input
                      key={`password-field-${field.name}-${fieldIdx}`}
                      name={field.name}
                      label={field.label}
                      value={passwordForm[field.name]}
                      required
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.formSubmitButton}
                  >
                    Submit
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleCancelChangeAvatar}
                    style={{ marginTop: '10px' }}
                  >
                    Cancel
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
