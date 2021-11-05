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
} from '@material-ui/core/';
import useStyles from '../../../containers/styles';
import { deleteWeek, updateWeek } from '../../../redux/actions/weekActions';
import { updateUser } from '../../../redux/actions/userActions';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';
import Input from '../../common/Input/Input';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import { getInitialWeekForm, weekFormFields } from '../../../utils/forms/weeks';
import RoundButton from '../../common/Buttons/RoundButton';
import BlockButton from '../../common/Buttons/BlockButton';

const WeekCard = ({ week }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { weekId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
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
    if (weekId !== undefined && weekId !== currentUser.currentWeek) {
      dispatch(deleteWeek(weekId, currentUser.currentWeek, history));
    } else {
      dispatch(
        addAlertWithTimeout(
          'error',
          'Please select another week as your current week before deleting'
        )
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
            src={week.userId?.avatar}
          />
        }
        action={
          <>
            {week._id === currentUser.currentWeek ? (
              <RoundButton type="default" />
            ) : (
              <RoundButton
                type="setDefault"
                handleClick={() => handleSetCurrentWeek(week._id)}
              />
            )}
            {!!weekId && (
              <>
                <RoundButton type="shoppingCart" />

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
                  <RoundButton type={'edit'} handleClick={toggleOpenEditMode} />
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
        subheader="Updated at 10/4/2021"
      />
      <CardContent>
        {!openEditMode && (
          <div>
            <Typography>Description: {week?.weekDescription}</Typography>
            <Typography>Diet: {week?.weekDiet}</Typography>
            <Typography>Calo Goal: {week?.caloGoal}</Typography>
            <Typography>Plan Tag: {week?.planTag}</Typography>
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
              />
            ))}
            <BlockButton type="submit" />
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default WeekCard;
