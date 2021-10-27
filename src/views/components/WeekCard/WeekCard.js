import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Avatar,
} from '@material-ui/core/';
import { styled } from '@material-ui/core/styles';
import useStyles from '../../../containers/styles';
import { deleteWeek, updateWeek } from '../../../redux/actions/weekActions';
// import { setCurrentWeek } from '../../../redux/actions/userActions';
import Input from '../../common/Input/Input';
import useToggle from '../../../utils/hooks/useToggle';
import useForm from '../../../utils/hooks/useForm';
import { validate } from '../../../utils/validations/validate';
import RoundButton from '../../common/Buttons/RoundButton';

const WeekCard = ({ week }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { weekId } = useParams();
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [isInEditMode, toggleIsInEditMode] = useToggle(false);
  const {
    values: weekForm,
    handleSubmit,
    handleChange,
    errors,
    reset,
  } = useForm(
    {
      weekName: week?.weekName,
      weekDescription: week?.weekDescription,
      weekDiet: week?.weekDiet,
      caloGoal: week?.caloGoal,
      planTag: week?.planTag,
    },
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
    // TODO
    // else display error
  };

  const handleSetCurrentWeek = (weekId) => {
    if (weekId !== undefined) {
      dispatch(setCurrentWeek(weekId));
    }
    // TODO
    // else display error
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="week" className={classes.avatar}>
            R
          </Avatar>
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
                <RoundButton
                  type="setDefault"
                  handleClick={() => handleSetCurrentWeek(week?._id)}
                />
              </>
            )}
          </>
        }
        title="Thao Phung"
        subheader="created at 10/4/2021"
      />
      <CardContent>
        {!isInEditMode && (
          <div variant="body2" color="text.secondary">
            Name:
            <Link to={{ pathname: `/weeks/${week._id}` }}>{week.weekName}</Link>
            <div>Description: {week?.weekDescription}</div>
            <div>Diet: {week?.weekDiet}</div>
            <div>Calo Goal: {week?.caloGoal}</div>
            <div>Plan Tag: {week?.planTag}</div>
          </div>
        )}
        {isInEditMode && (
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            <Input
              name="weekName"
              label="Week Name"
              value={weekForm?.weekName}
              handleChange={handleChange}
              error={errors?.weekName}
            />
            <Input
              name="weekDescription"
              label="Description"
              value={weekForm?.weekDescription}
              handleChange={handleChange}
            />
            <Input
              name="weekDiet"
              label="Diet"
              value={weekForm?.weekDiet}
              handleChange={handleChange}
              error={errors?.weekDiet}
            />
            <Input
              name="caloGoal"
              label="Calories Goal"
              type="number"
              value={weekForm?.caloGoal}
              handleChange={handleChange}
              error={errors?.caloGoal}
            />
            <Input
              name="planTag"
              label="Plan Tag"
              value={weekForm?.planTag}
              handleChange={handleChange}
            />
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
