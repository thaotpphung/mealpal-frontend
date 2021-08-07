import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Grid } from "@material-ui/core";
import PlanList from "../../components/PlanList/PlanList";
import WeekList from "../../components/WeekList/WeekList";
import Menu from "../../components/Menu/Menu";

const Plans = () => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} sm={3}>
        <PlanList />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Menu />
      </Grid>
      <Grid item xs={12} sm={3}>
        <WeekList />
      </Grid>
    </Grid>
  );
};

export default Plans;
