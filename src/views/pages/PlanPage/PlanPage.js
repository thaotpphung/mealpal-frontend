import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Grid, IconButton, Paper } from "@material-ui/core";
import List from "../../components/List/List";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

const Plans = () => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} sm={3} className={classes.leftColumn}>
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
      </Grid>
      <Grid item xs={12} sm={6} className={classes.centerColumn}>
        <Paper className={classes.root}>
          <div className={classes.header}>
            <div>title</div>
            <div className={classes.action}><MoreHorizIcon/></div>
          </div>
          <div className={classes.content}>
            <div className={classes.itemAvatar}>
              Breakfast
            </div>
            <div className={classes.itemContent}>
              <ul className={classes.menu}>
                <li><RestaurantMenuIcon/> veggies</li>
                <li><RestaurantMenuIcon/> shrimp asparagus</li>
                <li><RestaurantMenuIcon/> veggies</li>
              </ul>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={3} className={classes.rightColumn}>
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
      </Grid>
    </Grid>
  );
};

export default Plans;
