import React from 'react';
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
} from '@material-ui/core/';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import useStyles from './styles';

const PlanPost = () => {
  const classes = useStyles();

  const Likes = () => {
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
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
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="{plan.fullname}"
        subheader="plan.createdTime"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          plan.planName
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          plan.planDescription
        </Typography>
        <div className={classes.chips}>
          <Chip size="medium" label="plan.category" />
          <Chip size="medium" label="vegan" />
          <Chip size="medium" label="vegetarian" />
          <Chip size="medium" label="vegan" />
        </div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          <Likes />
        </Button>
        <IconButton aria-label="share" color="primary">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PlanPost;
