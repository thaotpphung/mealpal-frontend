import React, { useState, useEffect } from 'react';
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
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import { formatTime } from '../../../utils/time';
import { getInitialWeekForm, weekFormFields } from '../../../utils/forms/weeks';
import RoundButton from '../../common/Buttons/RoundButton';
import BlockButton from '../../common/Buttons/BlockButton';
import Input from '../../common/Input/Input';
import TagList from '../../containers/TagList/TagList';
import AutocompleteTag from '../../common/AutocompleteTag/AutocompleteTag';

const WeekCard = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { weekId } = useParams();
  const { loggedInUser } = useSelector((state) => state.user);
  const { loadingUpdate, error, week } = useSelector((state) => state.week);
  const [tags, setTags] = useState(data.tags);
  const { recipes } = useSelector((state) => state.recipeSearchList);
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      reset();
      setTags(data.tags);
    }
  );

  useEffect(() => {
    if (error === '') toggleOpenEditMode(false);
  }, [week]);

  const {
    values: weekForm,
    handleSubmit,
    handleChange,
    errors,
    reset,
  } = useForm({ ...getInitialWeekForm(true, data) }, () => {
    dispatch(
      updateWeek(data._id, {
        ...weekForm,
        tags,
      })
    );
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
    dispatch(
      createWeek({ weekId, userId: loggedInUser._id }, history, recipes)
    );
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
        data?.userId._id === loggedInUser._id &&
        weekId !== loggedInUser.currentWeek && (
          <MenuItem onClick={handleSetCurrentWeek}>
            <RoundButton type="default" />
            <Typography>Set Default</Typography>
          </MenuItem>
        )}
      {loggedInUser &&
        data?.userId._id === loggedInUser._id && [
          <MenuItem
            key="addCart"
            onClick={() => {
              dispatch(addToCartByWeek(data, history));
            }}
          >
            <RoundButton type="shoppingCart" />
            <Typography>Add To Cart</Typography>
          </MenuItem>,
          <MenuItem
            key="deleteCart"
            onClick={() => {
              handleDeleteWeek(data?._id);
            }}
          >
            <RoundButton type="delete" />
            <Typography>Delete</Typography>
          </MenuItem>,
        ]}
      {/* {loggedInUser && data?.userId._id !== loggedInUser._id && (
        <MenuItem key="saveWeek" onClick={() => handleSaveWeek(data._id)}>
          <RoundButton type="save" />
          <Typography>Save</Typography>
        </MenuItem>
      )} */}
      {loggedInUser && data?.userId._id === loggedInUser._id && (
        <MenuItem
          key="duplicateWeek"
          onClick={() => handleDuplicateWeek(data._id)}
        >
          <RoundButton type="duplicate" />
          <Typography>Duplicate</Typography>
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
            src={data.userId?.avatar}
          />
        }
        action={
          <>
            {!!loggedInUser && (
              <>
                {/* all week view */}
                {!weekId && data._id === loggedInUser.currentWeek && (
                  <>
                    <RoundButton type="default" />
                  </>
                )}
                {/* single week view*/}
                {weekId && (
                  <>
                    {loggedInUser._id === data.userId._id && (
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
                    {loggedInUser && data?.userId._id === loggedInUser._id && (
                      <RoundButton
                        type="more"
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        handleClick={handleMobileMenuOpen}
                      />
                    )}
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
              history.push(`/users/${data.userId._id}/weeks/${data._id}`)
            }
          >
            {data.name}
          </Typography>
        }
        subheader={`Updated ${formatTime(data.updatedTime)}`}
      />

      <CardContent>
        {!openEditMode && (
          <div>
            <Grid container spacing={1} alignItems="stretch">
              <Grid item xs={12} lg={12}>
                <Typography>
                  <strong>Description: </strong>
                  {data.description}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Typography>
                  <strong>Calories/Day: </strong>
                  {data.calories} kCal
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
                    history.push(`/users/${data.userId._id}/profile`)
                  }
                >
                  {data.userId.username}
                </Typography>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography component="span">
                  <strong>Tags: </strong>
                </Typography>
                <TagList data={data.tags} title="weekCard" />
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
            <AutocompleteTag setTags={setTags} defaultValue={data.tags} />
            <BlockButton type="submit" fullWidth loading={loadingUpdate}>
              Submit
            </BlockButton>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default WeekCard;
