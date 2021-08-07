import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import { Grid, Paper, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Plans from "../../components/Plans/Plans";
import FriendList from "../../components/FriendList/FriendList";

const Home = () => {
  const classes = useStyles();
  const userSignin = useSelector(state => state.userSignin);
  const { success } = userSignin;
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} sm={8}>
        <Plans />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FriendList />
      </Grid>
    </Grid>
  );
};

export default Home;
