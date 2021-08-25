import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Grid, Paper, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const List = ({
  title,
  action,
  data,
  style,
  handleClickItem,
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
              <li key={`item-${idx}`} 
                className={`${classes.item} ${item.isSelected ? classes.selected : null}`} 
                style={style} 
                onClick={(e) => handleClickItem(e, item._id)}
              >
                {item.icon && <div className={classes.itemIcon}>{item.icon}</div>}
                <div className={classes.itemContent}>{item.content}</div>
                <div className={classes.itemAction} >{item.action}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </Paper>
  );
};

export default List;
