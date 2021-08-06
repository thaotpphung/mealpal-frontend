import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Grid, Paper, Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Plans from "../../components/Plans/Plans";
import List from "../../components/List/List";

const Home = () => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} sm={8}>
        <Plans />
      </Grid>
      <Grid item xs={12} sm={4}>
        <List
          data={[
            {
              userName: "andy123",
              link: ""
            },
            {
              userName: "andy123",
              link: ""
            },
            {
              userName: "andy123",
              link: ""
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
      </Grid>
    </Grid>
  );
};

export default Home;
