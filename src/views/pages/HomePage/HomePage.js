import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, TextField, Button } from '@material-ui/core';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import useStyles from './styles';
import WeekList from '../../components/WeekList/WeekList';
import Menu from '../../components/Menu/Menu';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';
import { setSelectedWeek } from '../../../redux/actions/selectActions';
import { createWeek } from '../../../redux/actions/weekActions';
import Spinner from '../../common/Spinner/Spinner';
import Input from '../../common/Input/Input';

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedWeek } = useSelector((state) => state.select);
  const { weeks } = useSelector((state) => state.weekList);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => dispatch(setSelectedWeek(currentUser.currentWeek)), []);

  // dialog
  const [open, toggleOpen] = useState(false);

  const initialState = {
    weekName: '',
    weekDescription: '',
    weekTags: [],
    weekDiet: '',
  };
  const handleClose = () => {
    setDialogValue(initialState);
    toggleOpen(false);
  };
  const [dialogValue, setDialogValue] = useState(initialState);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createWeek({ ...dialogValue, userId: currentUser._id }));
    handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let formattedValue = name === 'weekTags' ? value.split(',') : value;
    setDialogValue({ ...dialogValue, [name]: formattedValue });
  };

  return (
    <div>
      <Grid container justify="space-between" alignItems="stretch" spacing={7}>
        <Grid item xs={12} sm={4} className={classes.leftColumn}>
          <WeekInfoCard week={weeks[selectedWeek.id]} />
          <WeekList toggleOpen={toggleOpen} />
        </Grid>
        <Grid item xs={12} sm={8}>
          {selectedWeek.id === undefined ? (
            <Typography>Please select a week</Typography>
          ) : (
            <Menu />
          )}
        </Grid>
      </Grid>

      <Dialog className={classes.dialog} open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new recipe</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={dialogValue.weekName}
              onChange={handleChange}
              name="weekName"
              type="text"
              label="Week Name"
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              value={dialogValue.weekDescription}
              onChange={handleChange}
              name="weekDescription"
              type="text"
              variant="standard"
              label="Week Description"
            />
            <TextField
              autoFocus
              margin="dense"
              value={dialogValue.weekTags}
              onChange={handleChange}
              name="weekTags"
              type="text"
              variant="standard"
              label="Week Tags"
            />
            <TextField
              autoFocus
              margin="dense"
              value={dialogValue.weekDiet}
              onChange={handleChange}
              name="weekDiet"
              type="text"
              label="Week Diet"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default HomePage;
