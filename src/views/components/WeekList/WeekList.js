import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { Paper, IconButton, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import {
  getWeekListByPlanId,
  createWeek,
  deleteWeek,
} from '../../../redux/actions/weekActions';

const WeekList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { selectedPlan } = useSelector((state) => state.planList);
  const { weeks } = useSelector((state) => state.weekList);
  const [newWeekName, setNewWeekName] = useState('');

  useEffect(() => {
    dispatch(getWeekListByPlanId(selectedPlan));
  }, [selectedPlan]);

  const handleChangeNewWeekName = (event) => {
    setNewWeekName(event.target.value);
  };

  const handleSubmitCreateWeek = () => {
    dispatch(createWeek({ weekName: newWeekName, planId: selectedPlan }));
  };

  const handleDeleteWeek = (weekId) => {
    dispatch(deleteWeek(weekId));
  };

  // const handleEditWeek = (weekId) => {
  //   dispatch(deleteWeek(weekId));
  // };

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
            <li key={week._id} className={`${classes.item}`}>
              <div className={classes.itemIcon}>icon</div>
              <div className={classes.itemContent}>{week.weekName}</div>
              <div className={classes.itemAction}>
                {/* <IconButton onClick={() => handleEditWeek(week._id)}>
                  <EditIcon />
                </IconButton> */}
                <IconButton onClick={() => handleDeleteWeek(week._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedPlan && (
        <Paper>
          <TextField
            variant="outlined"
            value={newWeekName}
            onChange={handleChangeNewWeekName}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmitCreateWeek}
          >
            Add Week
          </Button>
        </Paper>
      )}
    </Paper>
  );
};

export default WeekList;
