import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import List from "../../common/List/List";

const WeekList = () => {
  return (
    <List
      data={[
        {
          userName: "andy123",
          link: "",
        },
        {
          userName: "andy123",
          link: "",
        },
        {
          userName: "andy123",
          link: "",
        },
      ]}
      title={"Friend List"}
      action={
        <IconButton aria-label="settings">
          <MoreHorizIcon />
        </IconButton>
      }
      type="friend"
    />
  );
};

export default WeekList;
