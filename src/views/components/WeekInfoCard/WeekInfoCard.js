import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Grid,
  Avatar,
  IconButton,
  Collapse,
} from '@material-ui/core/';
import { styled } from '@material-ui/core/styles';
import useStyles from '../../../containers/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { deleteWeek, updateWeek } from '../../../redux/actions/weekActions';
import { setCurrentWeek } from '../../../redux/actions/userActions';
import Input from '../../common/Input/Input';
import useToggle from '../../../utils/hooks/useToggle';
import useForm from '../../../utils/hooks/useForm';
import { validate } from '../../../utils/validations/validate';
import RoundButton from '../../common/Buttons/RoundButton';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const WeekInfoCard = ({ week = {} }) => {
  console.log('in weekinfo', week);
  const classes = useStyles();
  const dispatch = useDispatch();
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
    },
    () => {
      dispatch(updateWeek(week._id, weekForm));
    },
    validate,
    ['weekDescription']
  );

  console.log(weekForm);

  const handleCancelEdit = () => {
    toggleIsInEditMode(false);
    reset();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteWeek = (weekId) => {
    if (weekId !== undefined && weekId !== currentUser.currentWeek._id) {
      dispatch(deleteWeek(weekId, currentUser.currentWeek));
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
            <RoundButton
              type="delete"
              handleClick={() => handleDeleteWeek(week?._id)}
            />
            <RoundButton
              type={isInEditMode ? 'cancel' : 'edit'}
              handleClick={handleCancelEdit}
            />
            <RoundButton
              type="setDefault"
              handleClick={() => handleSetCurrentWeek(week?._id)}
            />
          </>
        }
        title={
          <Link to={{ pathname: `/weeks/${week._id}` }}>
            Name:{week.weekName}
          </Link>
        }
        subheader="created at 10/4/2021"
      />
      <CardContent>
        {!isInEditMode && (
          <div variant="body2" color="text.secondary">
            <div>Description: {week?.weekDescription}</div>
            <div>Diet: {week?.weekDiet}</div>
          </div>
        )}
        {isInEditMode && (
          <form className={classes.formContainer} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                name="weekName"
                label="Week Name"
                value={weekForm?.weekName}
                handleChange={handleChange}
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
                error={errors.weekDiet}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.formSubmitButton}
            >
              Submit
            </Button>
          </form>
        )}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <RoundButton type="like" />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        Comment Section
      </Collapse>
    </Card>
  );
};

export default WeekInfoCard;
