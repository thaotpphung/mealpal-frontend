import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Avatar,
  IconButton,
  Collapse,
} from '@material-ui/core/';
import { styled } from '@mui/material/styles';
import useStyles from './styles';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { deleteWeek, updateWeek } from '../../../redux/actions/weekActions';
import { setCurrentWeek } from '../../../redux/actions/userActions';
import Input from '../../common/Input/Input';

const Likes = () => {
  return (
    <>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp;Like
    </>
  );
};

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

const WeekInfoCard = ({ week }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { selectedWeek } = useSelector((state) => state.select);

  const [isInEditMode, setIsInEditMode] = useState(false);

  const [weekForm, setWeekForm] = useState({});

  useEffect(() => {
    setWeekForm(week);
  }, [selectedWeek.id]);

  const handleChange = (e) => {
    setWeekForm({ ...weekForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateWeek(week._id, weekForm));
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteWeek = (weekId) => {
    if (weekId !== undefined) {
      dispatch(deleteWeek(weekId));
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

  const handleToggleEditMode = () => {
    setIsInEditMode(!isInEditMode);
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
            <IconButton
              aria-label="settings"
              onClick={() => handleDeleteWeek(week?._id)}
            >
              <DeleteIcon />
            </IconButton>

            {isInEditMode ? (
              <IconButton onClick={handleToggleEditMode}>
                <DoneIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleToggleEditMode}>
                <EditIcon />
              </IconButton>
            )}

            <IconButton
              aria-label="settings"
              onClick={() => handleSetCurrentWeek(week?._id)}
            >
              <StarIcon />
            </IconButton>
          </>
        }
        title="thao phung"
        subheader="created at 10/4/2021"
      />
      <CardContent>
        {!isInEditMode && (
          <div variant="body2" color="text.secondary">
            <div>Description: {week?.weekDescription}</div>
            <div>Diet: {week?.weekDiet}</div>
            <div>Tags: {week?.weekTags}</div>
          </div>
        )}

        {isInEditMode && (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input
                name="weekDescription"
                label="Description"
                value={weekForm?.weekDescription}
                handleChange={handleChange}
              />
              <Input
                name="weekTags"
                label="Week Tags (Separated by comma)"
                value={weekForm?.weekTags}
                handleChange={handleChange}
              />
              <Input
                name="weekDiet"
                label="Servings"
                value={weekForm?.weekDiet}
                handleChange={handleChange}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        )}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          <Likes />
        </Button>
        <IconButton aria-label="share" color="primary">
          <ShareIcon />
        </IconButton>
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
