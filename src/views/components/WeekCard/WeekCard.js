import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core/';
import useStyles from '../../../app/styles';
import {
  deleteWeek,
  updateWeek,
  createWeek,
} from '../../../redux/actions/weekActions';
import { updateUser } from '../../../redux/actions/userActions';
import { addToCartByWeek } from '../../../redux/actions/cartActions';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';
import Input from '../../common/Input/Input';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import { formatTime } from '../../../utils/time';
import { getInitialWeekForm, weekFormFields } from '../../../utils/forms/weeks';
import RoundButton from '../../common/Buttons/RoundButton';
import BlockButton from '../../common/Buttons/BlockButton';

const WeekCard = ({ week }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { weekId } = useParams();
  const { loggedInUser } = useSelector((state) => state.user);
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => reset()
  );
  const {
    values: weekForm,
    handleSubmit,
    handleChange,
    errors,
    reset,
  } = useForm({ ...getInitialWeekForm(true, week) }, () => {
    dispatch(updateWeek(week._id, weekForm));
    toggleOpenEditMode(false);
  });

  const handleDeleteWeek = (weekId) => {
    if (weekId !== undefined && weekId !== loggedInUser.currentWeek) {
      dispatch(deleteWeek(weekId, loggedInUser, history));
    } else {
      dispatch(
        addAlertWithTimeout(
          'error',
          'Please select another week as your current week before deleting'
        )
      );
    }
  };

  const handleSetCurrentWeek = () => {
    dispatch(updateUser(loggedInUser._id, { currentWeek: weekId }));
  };

  const handleDuplicateWeek = (weekId) => {
    dispatch(createWeek({ weekId }, history));
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const mobileMenuId = 'primary-menu-mobile';
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {loggedInUser &&
        week?.userId._id === loggedInUser._id &&
        weekId !== loggedInUser.currentWeek && (
          <MenuItem onClick={handleSetCurrentWeek}>
            <RoundButton type="default" />
            <Typography>Set Default</Typography>
          </MenuItem>
        )}
      {loggedInUser &&
        week?.userId._id === loggedInUser._id && [
          <MenuItem
            key="addCart"
            onClick={() => {
              dispatch(addToCartByWeek(week, history));
            }}
          >
            <RoundButton type="shoppingCart" />
            <Typography>Add To Cart</Typography>
          </MenuItem>,
          <MenuItem
            key="deleteCart"
            onClick={() => {
              handleDeleteWeek(week?._id);
            }}
          >
            <RoundButton type="delete" />
            <Typography>Delete</Typography>
          </MenuItem>,
        ]}
      {loggedInUser && week?.userId._id !== loggedInUser._id && (
        <MenuItem key="saveWeek" onClick={() => handleDuplicateWeek(weekId)}>
          <RoundButton type="save" />
          <Typography>Save</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label="userAvatar"
            className={classes.avatar}
            src={week.userId?.avatar}
          />
        }
        action={
          <>
            {!!loggedInUser && (
              <>
                {/* all week view */}
                {!weekId && week._id === loggedInUser.currentWeek && (
                  <>
                    <RoundButton type="default" />
                  </>
                )}
                {/* single week view*/}
                {weekId && (
                  <>
                    {loggedInUser._id === week.userId._id && (
                      <>
                        {openEditMode ? (
                          <RoundButton
                            type="cancel"
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
                    <RoundButton
                      type="more"
                      aria-label="show more"
                      aria-controls={mobileMenuId}
                      aria-haspopup="true"
                      handleClick={handleMobileMenuOpen}
                    />
                  </>
                )}
              </>
            )}
            {renderMobileMenu}
          </>
        }
        title={
          <Link to={{ pathname: `/weeks/${week._id}` }}>
            <Typography>{week.weekName}</Typography>
          </Link>
        }
        subheader={`Updated ${formatTime(week.updatedTime)}`}
      />
      <CardContent>
        {!openEditMode && (
          <div>
            <Grid container spacing={1} alignItems="stretch">
              <Grid item xs={12} lg={12}>
                <Typography>
                  <strong>Description: </strong>
                  {week.weekDescription}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Calo Goal: </strong>
                  {week.caloGoal} kCal
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Diet: </strong>
                  {week.weekDiet}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Plan Tag: </strong>
                  {week.planTag}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography component="span">
                  <strong>Creator: </strong>
                  <Link to={{ pathname: `/users/${week.userId._id}/profile` }}>
                    {week.userId.username}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
        {openEditMode && (
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            {weekFormFields.map((field, fieldIdx) => (
              <Input
                key={`weekformfield-${field.name}-${fieldIdx}`}
                name={field.name}
                type={field.type ? field.type : 'text'}
                label={field.label}
                value={weekForm[field.name].toString()}
                handleChange={handleChange}
                error={errors[field.name]}
                required={field.required}
                step={field.step}
              />
            ))}
            <BlockButton type="submit" fullWidth>
              Submit
            </BlockButton>
          </form>
        )}
      </CardContent>
      {/* <CardActions disableSpacing>
        <RoundButton type="like" />
      </CardActions> */}
    </Card>
  );
};

export default WeekCard;
