import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import useStyles from './styles';
import WeekList from '../../components/WeekList/WeekList';
import Menu from '../../components/Menu/Menu';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';
import { setSelectedWeek } from '../../../redux/actions/selectActions';
import { createWeek } from '../../../redux/actions/weekActions';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import useForm from '../../../utils/hooks/useForm';
import { getAllWeeks } from '../../../redux/actions/weekActions';

const WeekDetailsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedWeek } = useSelector((state) => state.select);
  const { weeks } = useSelector((state) => state.weekList);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => dispatch(setSelectedWeek(currentUser.currentWeek)), []);

  useEffect(() => {
    dispatch(getAllWeeks());
  }, []);

  const [open, toggleOpen] = useState(false);

  const initialState = {
    weekName: '',
    weekDescription: '',
    weekTags: [],
    weekDiet: '',
  };

  const { handleChange, handleSubmit, values, reset } = useForm(
    initialState,
    () => {
      dispatch(createWeek({ ...values, userId: currentUser._id }));
      handleClose();
    }
  );

  const handleClose = () => {
    reset();
    toggleOpen();
  };

  return (
    <div>
      <PopupDialog
        title="add week"
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        open={open}
        content={
          <>
            <TextField
              value={values.weekName}
              onChange={handleChange}
              name="weekName"
              label="Week Name"
            />
            <TextField
              value={values.weekDescription}
              onChange={handleChange}
              name="weekDescription"
              label="Week Description"
            />
            <TextField
              value={values.weekTags}
              onChange={handleChange}
              name="weekTags"
              label="Week Tags"
            />
            <TextField
              value={values.weekDiet}
              onChange={handleChange}
              name="weekDiet"
              label="Week Diet"
            />
          </>
        }
      />
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
    </div>
  );
};

export default WeekDetailsPage;
