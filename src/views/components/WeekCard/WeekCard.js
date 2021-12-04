import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  Chip,
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
import useInput from '../../../utils/hooks/useInput';
import { formatTime } from '../../../utils/time';
import { getInitialWeekForm, weekFormFields } from '../../../utils/forms/weeks';
import RoundButton from '../../common/Buttons/RoundButton';
import BlockButton from '../../common/Buttons/BlockButton';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';

const WeekCard = ({ week }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { weekId } = useParams();
  const { loggedInUser } = useSelector((state) => state.user);
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      reset();
      resetTags();
    }
  );

  const [tags, handleChangeTags, resetTags] = useInput(
    week.tags.join(', ').replace(/, ([^,]*)$/, ', $1')
  );

  const {
    values: weekForm,
    handleSubmit,
    handleChange,
    errors,
    reset,
  } = useForm({ ...getInitialWeekForm(true, week) }, () => {
    dispatch(
      updateWeek(week._id, {
        ...weekForm,
        tags: tags !== '' ? tags.split(',').map((tag) => tag.trim()) : [],
      })
    );
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
          <Typography
            className={classes.clickable}
            onClick={() =>
              history.push(`/users/${week.userId._id}/weeks/${week._id}`)
            }
          >
            {week.name}
          </Typography>
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
                  {week.description}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Calories/Day: </strong>
                  {week.calories} kCal
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography component="span">
                  <strong>Creator: </strong>
                </Typography>
                <Typography
                  component="span"
                  className={classes.clickable}
                  onClick={() =>
                    history.push(`/users/${week.userId._id}/profile`)
                  }
                >
                  {week.userId.username}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography component="span">
                  <strong>Tags: </strong>
                </Typography>
                {week.tags.map((tag, tagIdx) => (
                  <Chip
                    size="small"
                    key={`tag-${tagIdx}`}
                    label={tag}
                    className={classes.tag}
                  />
                ))}
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
                multiline
                minRows={field.name === 'description' ? 4 : 0}
              />
            ))}
            <InputWithTooltip
              label="tags"
              tooltip='Separated by comma, Ex: "Weight Loss Program, Keto, Vegan"'
              multiline
              minRows={4}
              value={tags}
              handleChange={handleChangeTags}
            />
            <BlockButton type="submit" fullWidth>
              Submit
            </BlockButton>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default WeekCard;
