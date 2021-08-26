import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Grid,
  Paper,
  Avatar,
  IconButton,
  Chip,
  TextField,
  Button
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import List from "../../common/List/List";

import AddIcon from "@material-ui/icons/Add";
import Spinner from "../../common/Spinner/Spinner";
import { getWeekListByPlanId, createWeek, setSelectedWeek} from "../../../redux/actions/weekActions";

const WeekList = ({ currentWeek }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [weekName, setWeekName] = useState('');
  const { selectedPlan } = useSelector(state => state.planList);
  const { loading, success, error, weeks } = useSelector(state => state.weekList);

  useEffect(() => {
    dispatch(getWeekListByPlanId(selectedPlan));
  }, [selectedPlan]);

  const handleSelectWeek = (e, weekId) => {
    dispatch(setSelectedWeek(weekId)); 
  };

  const handleChangeWeekName = (event) => {
    setWeekName(event.target.value);
  }

  const handleAddWeek = (e) => {};

  const handleSubmitAddWeek = (e) => {
    dispatch(createWeek({weekName, planId: selectedPlan}, history));
  };

  return ( loading ? <Spinner/> : error ? <div>{error}</div> : 
    weeks ? 
    <>
      <List
        title={"Week List"}
        action={
          <IconButton onClick={handleAddWeek}>
            <AddIcon />
          </IconButton>
        }
        handleClickItem={handleSelectWeek}
        data={weeks}
      />

      <Paper>
      <TextField
        variant="outlined"
        value={weekName}
        onChange={handleChangeWeekName}
      />
      <Button
        variant="contained"
        color="primary"
        // className={classes.button}
        onClick={handleSubmitAddWeek}
      >
        Add Week
        </Button>
      </Paper>
      
    </>
    : 
    <Spinner/>
  );
};

export default WeekList;
