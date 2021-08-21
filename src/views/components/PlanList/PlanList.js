import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Avatar, IconButton, Chip } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarIcon from "@material-ui/icons/Star";
import List from "../../common/List/List";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router";

const PlanList = ({plans, currentPlan}) => {
  const history = useHistory();

  const handleChoosePlan = (e) => {
    
  };

  const handleClickAddPlan = (e) => {
    console.log("click add plan");
  }

  const mappedPlans = plans.map(plan => ({
      content: plan.planName,
      isSelected: currentPlan === plan._id,
      action: currentPlan === plan._id ? <Chip size="small" label="Default" icon={<StarIcon />} /> : null
  }));

  return (
    <List
      title={"Plan List"}
      action={
        <IconButton onClick={() => history.push("/plans/new")}>
          <AddIcon onClick={handleClickAddPlan} />
        </IconButton>
      }
      handleClickItem={handleChoosePlan}
      data={mappedPlans}
    />
  );
};

export default PlanList;
