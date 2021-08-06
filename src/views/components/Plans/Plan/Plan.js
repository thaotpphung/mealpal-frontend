import React from "react";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Avatar,
  IconButton,
  Chip,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from "@material-ui/icons/Share";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useDispatch } from "react-redux";
import moment from "moment";

import useStyles from "./styles";

const Plan = ({ plan, setCurrentId }) => {
  const dispatch = useDispatch();
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
        title="user2131"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          KETO MEAL PLAN
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          This meal plan has a variety of ingredients and very healthy
        </Typography>
        <div className={classes.chips}>
          <Chip size="medium" label="Keto" />
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

export default Plan;
