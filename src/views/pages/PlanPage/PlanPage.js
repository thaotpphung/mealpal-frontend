import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Grid, Paper, Typography, Button , Chip} from "@material-ui/core";
import Menu from "../../components/Menu/Menu";
import StarIcon from "@material-ui/icons/Star";
import PlanList from "../../components/PlanList/PlanList";
import WeekList from "../../components/WeekList/WeekList";
import { plans, currentPlan, weeks, currentWeek, currentWeekDetails } from "../../../constants/data";
import { setCurrentPlan } from "../../../redux/actions/userActions";

const Plans = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedWeek }= useSelector(state => state.weekList);
  const { selectedPlan }= useSelector(state => state.planList);

  const handleClickSetCurrent = (e) => {
    dispatch(setCurrentPlan(selectedPlan, selectedWeek));
  }

  useEffect(() => {
    console.log('use effect in planpage', selectedPlan, selectedWeek)
    dispatch(setCurrentPlan(selectedPlan, selectedWeek));
  }, []);

  return (
    <div>
      <Paper className={classes.header}>
        <Chip
          label={<Typography>{selectedPlan}</Typography>}
        />
        <Chip
          label={<Typography>{selectedWeek}</Typography>}
        />
        <Button
          variant="outlined"
          color="primary"
          className={classes.button}
          startIcon={<StarIcon />}
          onClick={handleClickSetCurrent}
        >Set Current</Button>
      </Paper>
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={3}>
          <PlanList />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Menu week={currentWeekDetails}/>
        </Grid>
        <Grid item xs={12} sm={3}>
          <WeekList/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Plans;
