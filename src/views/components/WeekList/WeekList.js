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
import StarIcon from "@material-ui/icons/Star";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import Spinner from "../../common/Spinner/Spinner";
import { getWeekListByPlanId, createWeek } from "../../../redux/actions/weekActions";

const WeekList = ({ currentWeek }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [weekName, setWeekName] = useState('');
  const currentPlan = useSelector(state => state.user).currentPlan;
  const { loading, success, error, weeks } = useSelector(state => state.weekList);

  useEffect(() => {
    dispatch(getWeekListByPlanId(currentPlan));
  }, []);

  const handleChooseWeek = (e, id) => {
    // dispatch(getWeekListByPlanId(selectedPlan));
  };

  const handleChangeWeekName = (event) => {
    setWeekName(event.target.value);
  }

  const handleAddWeek = (e) => {};

  const handleSubmitAddWeek = (e) => {
    dispatch(createWeek({weekName, planId: currentPlan}, history));
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
        handleClickItem={handleChooseWeek}
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
