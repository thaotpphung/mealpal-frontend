import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Grid, Paper, Avatar, IconButton, Chip } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarIcon from "@material-ui/icons/Star";
import List from "../../common/List/List";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from '@material-ui/icons/Add';

import { getPlanList, setSelectedPlan } from "../../../redux/actions/planActions";
import Spinner from "../../common/Spinner/Spinner";

const PlanList = ({ currentPlan }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, success, error, plans } = useSelector(state => state.planList);

  useEffect(() => {
    dispatch(getPlanList());
  }, [])

  const handleChoosePlan = (e, id) => {
    console.log("id", id)
    // dispatch(setSelectedPlan(id)); 
  };


  return (loading ? <Spinner/> : error ? <div>{error}</div> :
    plans ? 
    <List
      title={"Plan List"}
      action={
        <IconButton onClick={() => history.push("/plans/new")}>
          <AddIcon />
        </IconButton>
      }
      handleClickItem={handleChoosePlan}
      data={plans}
    />
    
    :
    <Spinner/> 
  );
};

export default PlanList;
