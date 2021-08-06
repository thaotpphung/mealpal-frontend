import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Grid, Paper, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const List = ({
  title,
  action,
  data,
  type,
  itemAvatar,
  itemContent,
  itemAction,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div>{title}</div>
        <div className={classes.action}>{action}</div>
      </div>
      <div className={classes.content}>
        <ul className={classes.list}>
          {data.map((item, idx) => {
            return (
              <li key={`item-${idx}`} className={classes.item}>
                <div className={classes.itemAvatar}>
                  <Avatar>{item.userName.charAt(0).toUpperCase()}</Avatar>
                </div>
                <div className={classes.itemContent}>{item.userName}</div>
                <div className={classes.itemAction}>{itemAction}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </Paper>
  );
};

export default List;
