import React, {useState, useEffec} from "react";
import {useHistory} from "react-router-dom";
import useStyles from "./styles";
import { TextField, Paper } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab'

const defaultMeals = ['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Snack'];

const NewPlan = () => {
  const classes = useStyles();

  return (
   <form className={classes.root} onSubmit={console.log}> 
    <TextField 
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="name"
      label="Name"
      name="name"
      autoFocus />
    <Autocomplete
      id="meals"
      options={defaultMeals}
      getOptionLabel={(option) => option}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Meals" variant="outlined" />}
    />

   </form>
  );
};

export default NewPlan;
