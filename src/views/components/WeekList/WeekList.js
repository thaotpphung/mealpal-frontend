import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { Paper, IconButton, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  getAllWeeks,
  createWeek,
  deleteWeek,
} from '../../../redux/actions/weekActions';
import { setSelectedWeek } from '../../../redux/actions/selectActions';

const WeekList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { selectedWeek } = useSelector((state) => state.select);
  const { weeks } = useSelector((state) => state.weekList);

  useEffect(() => {
    dispatch(getAllWeeks());
  }, []);

  const handleDeleteWeek = (weekId) => {
    dispatch(deleteWeek(weekId));
  };

  const handleEditWeek = (weekId) => {
    dispatch(deleteWeek(weekId));
  };

  const handleSelectWeek = (week) => {
    dispatch(setSelectedWeek(week));
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div>Week List</div>
        <div className={classes.action}>
          <IconButton onClick={() => history.push('/weeks/new')}>
            <AddIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.content}>
        <ul className={classes.list}>
          {Object.values(weeks).map((week) => (
            <li
              key={week._id}
              className={`${classes.item} ${
                week._id === selectedWeek.id ? classes.selected : null
              }`}
              onClick={() => handleSelectWeek(week)}
            >
              <div className={classes.itemIcon}>icon</div>
              <div className={classes.itemContent}>{week.weekName}</div>
              <div className={classes.itemAction}>
                <IconButton onClick={() => handleEditWeek(week._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteWeek(week._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Paper>
  );
};

export default WeekList;
