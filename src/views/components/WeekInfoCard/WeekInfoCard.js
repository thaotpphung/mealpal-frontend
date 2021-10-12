import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
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
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { deleteWeek } from '../../../redux/actions/weekActions';
import { setCurrentWeek } from '../../../redux/actions/userActions';

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
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
            <IconButton aria-label="settings">
              <EditIcon />
            </IconButton>
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
        <Typography>Name: {week?.weekName} </Typography>
        <Typography>Diet: {week?.weekDiet}</Typography>
        <Typography>Tags: {week?.weekTags}</Typography>
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
