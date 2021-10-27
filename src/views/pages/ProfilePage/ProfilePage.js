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
import LockIcon from '@material-ui/icons/Lock';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import useToggle from '../../../utils/hooks/useToggle';
import useForm from '../../../utils/hooks/useForm';
import Input from '../../common/Input/Input';
import { validate } from '../../../utils/validations/validate';
import { updateUser } from '../../../redux/actions/userActions';

const ProfilePage = () => {
  const { loading, currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const localClasses = styles();
  const [isInEditMode, toggleIsInEditMode] = useToggle(false);
  const [isShowComponent, setIsShowComponent] = useState({});

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
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Security" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={8} className={localClasses.rightColumn}>
          <Paper className={localClasses.form}>
            <form className={classes.formContainer} onSubmit={handleSubmit}>
              <Typography variant="h4" style={{ marginBottom: '10px' }}>
                {currentUser.username}
              </Typography>
              <Grid container spacing={2}>
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
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
