import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from '@material-ui/core/';
import useStyles from '../../../app/styles';
import { deleteWeek, updateWeek } from '../../../redux/actions/weekActions';
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
                {week?.userId._id === loggedInUser._id ? (
                  <>
                    {week._id === loggedInUser.currentWeek && (
                      <>
                        <RoundButton type="default" />
                      </>
                    )}
                    {!!weekId && (
                      <>
                        <RoundButton
                          type="shoppingCart"
                          handleClick={() =>
                            dispatch(addToCartByWeek(week, history))
                          }
                        />
                        {weekId !== loggedInUser.currentWeek && (
                          <RoundButton
                            type="setDefault"
                            handleClick={handleSetCurrentWeek}
                          />
                        )}
                        <RoundButton
                          type="delete"
                          handleClick={() => handleDeleteWeek(week?._id)}
                        />
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
                ) : (
                  <></>
                  // <RoundButton
                  //   type="add"
                  //   handleClick={() => handleDuplicateWeek(week._id)}
                  // />
                )}
              </>
            )}
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
            <Typography>
              <strong>Description: </strong>
              {week.description}
            </Typography>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Calo Goal: </strong>
                  {week.caloGoal}
                </Typography>
                <Typography>
                  <strong>Diet: </strong>
                  {week.weekDiet}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Plan Tag: </strong>
                  {week.planTag}
                </Typography>
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
                value={weekForm[field.name]}
                handleChange={handleChange}
                error={errors[field.name]}
                required={field.required}
                step={field.step}
              />
            ))}
            <BlockButton type="submit">Submit</BlockButton>
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
