import React, { useState, useEffec } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import {
  Container,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CustomCard from "../../../common/Card/Card";

const Plan = ({ planName, details }) => {
  const [spacing, setSpacing] = React.useState(3);
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <Grid container justify="center" direction="column" spacing={spacing}>
        {details.map((day) => (
          <Grid key={day.title} item>
            <CustomCard
              title={day.title}
              meals={day.meals}
              className={classes.card}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Plan;
