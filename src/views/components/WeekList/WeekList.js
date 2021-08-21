import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Paper, Avatar, IconButton, Chip } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import List from "../../common/List/List";
import StarIcon from "@material-ui/icons/Star";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';

const WeekList = ({weeks, currentWeek}) => {

  const mappedWeeks = weeks.map(week => ({
    content: week.weekName,
    isSelected: currentWeek === week._id,
    action: currentWeek === week._id ? <Chip size="small" label="Default" icon={<StarIcon />} /> : null
  }));


  const handleChooseWeek = (e) => {
    console.log("Click a week");
  };

  const handleClickAddWeek = (e) => {
    console.log("click add week");
  }

  return (
    <List
      title={"Week List"}
      action={
        <IconButton aria-label="settings">
          <AddIcon onClick={handleClickAddWeek}/>
        </IconButton>
      }
      handleClickItem={handleChooseWeek}
      data={mappedWeeks}
    />
  );
};

export default WeekList;
