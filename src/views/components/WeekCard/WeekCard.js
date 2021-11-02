import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Avatar,
  Typography,
  Grid,
} from '@material-ui/core/';
import { styled } from '@material-ui/core/styles';
import useStyles from '../../../containers/styles';
import { deleteWeek, updateWeek } from '../../../redux/actions/weekActions';
import { updateUser } from '../../../redux/actions/userActions';
import Input from '../../common/Input/Input';
import useToggle from '../../../utils/hooks/useToggle';
import useForm from '../../../utils/hooks/useForm';
import { getInitialWeekForm, weekFormFields } from '../../../utils/forms/weeks';
import { validate } from '../../../utils/validations/validate';
import RoundButton from '../../common/Buttons/RoundButton';

const WeekCard = ({ week }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { weekId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [isInEditMode, toggleIsInEditMode] = useToggle(false);
  const {
    values: weekForm,
    handleSubmit,
    handleChange,
    errors,
    reset,
  } = useForm(
    getInitialWeekForm(true, week),
    () => {
      dispatch(updateWeek(week._id, weekForm));
      toggleIsInEditMode(false);
    },
    validate,
    ['weekDescription', 'planTag']
  );
  const handleCancelEdit = () => {
    toggleIsInEditMode(false);
    reset();
  };
  const handleDeleteWeek = (weekId) => {
    if (weekId !== undefined && weekId !== currentUser.currentWeek?._id) {
      dispatch(deleteWeek(weekId, currentUser.currentWeek, history));
    } else {
      console.log(
        'Please select another week as your current week before deleting'
      );
    }
  };
  const handleSetCurrentWeek = (weekId) => {
    if (weekId !== undefined) {
      dispatch(updateUser(currentUser._id, { currentWeek: weekId }));
    }
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label="userAvatar"
            className={classes.avatar}
            src={week.userId.avatar}
          />
        }
        action={
          <>
            {!!weekId && (
              <>
                <RoundButton
                  type="delete"
                  handleClick={() => handleDeleteWeek(week?._id)}
                />
                {isInEditMode ? (
                  <RoundButton type={'cancel'} handleClick={handleCancelEdit} />
                ) : (
                  <RoundButton type={'edit'} handleClick={toggleIsInEditMode} />
                )}
              </>
            )}
            {week._id === currentUser.currentWeek ? (
              <RoundButton type="default" />
            ) : (
              <RoundButton
                type="setDefault"
                handleClick={() => handleSetCurrentWeek(week._id)}
              />
            )}
          </>
        }
        title={
          <Link to={{ pathname: `/weeks/${week._id}` }}>
            <Typography>{week.weekName}</Typography>
          </Link>
        }
        subheader="Updated at 10/4/2021"
      />
      <CardContent>
        {!isInEditMode && (
          <div>
            <Typography>Description: {week?.weekDescription}</Typography>
            <Typography>Diet: {week?.weekDiet}</Typography>
            <Typography>Calo Goal: {week?.caloGoal}</Typography>
            <Typography>Plan Tag: {week?.planTag}</Typography>
          </div>
        )}
        {isInEditMode && (
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
              />
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.formSubmitButton}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default WeekCard;
