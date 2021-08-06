import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import {
  Container,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from "@material-ui/core";

const Plans = () => {
  const classes = useStyles();
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} sm={8}>
        <Plans />
      </Grid>
      <Grid item xs={12} sm={4}>
        
      </Grid>

    </Grid>
  );
};

export default Plans;
