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
  Chip,
  Collapse,
} from '@material-ui/core/';
import { styled } from '@mui/material/styles';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';

import useStyles from './styles';

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

const WeekInfo = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { weeks } = useSelector((state) => state.weekList);
  const { selectedWeek } = useSelector((state) => state.select);
  const { currentUser } = useSelector((state) => state.user);

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
            <IconButton aria-label="settings">
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="settings">
              <EditIcon />
            </IconButton>
          </>
        }
        title={currentUser.fullName}
        subheader="created at 10/4/2021"
      />
      <CardContent>
        <Typography>Name: {weeks[selectedWeek.id]?.weekName} </Typography>
        <Typography>Diet: {weeks[selectedWeek.id]?.diets}</Typography>
        <Typography>Plan Tags: {weeks[selectedWeek.id]?.planTags}</Typography>
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

export default WeekInfo;
