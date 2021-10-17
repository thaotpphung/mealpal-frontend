import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography, TextField } from '@material-ui/core';
import useStyles from './styles';
import WeekList from '../../components/WeekList/WeekList';
import Menu from '../../components/Menu/Menu';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';
import { setSelectedWeek } from '../../../redux/actions/selectActions';
import { createWeek } from '../../../redux/actions/weekActions';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import Spinner from '../../common/Spinner/Spinner';
import Input from '../../common/Input/Input';
import useForm from '../../../utils/hooks/useForm';
import useDialog from '../../../utils/hooks/useDialog';
import { validate } from '../../../utils/validations/validate';

import { getAllWeeks } from '../../../redux/actions/weekActions';

const WeekDetailsPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedWeek } = useSelector((state) => state.select);
  const { weeks, loading, error } = useSelector((state) => state.weekList);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => dispatch(setSelectedWeek(currentUser?.currentWeek)), []);

  useEffect(() => {
    dispatch(getAllWeeks());
  }, []);

  const { open, toggleOpen, handleClose } = useDialog(() => reset());

  const initialState = {
    weekName: '',
    weekDescription: '',
    weekTags: [],
    weekDiet: '',
  };

  const { handleChange, handleSubmit, values, reset, errors } = useForm(
    initialState,
    () => {
      dispatch(createWeek({ ...values, userId: currentUser._id }));
      handleClose();
    },
    validate
  );

  const Component = (
    <div>
      <PopupDialog
        title="add week"
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        open={open}
        content={
          <>
            <Input
              value={values.weekName}
              handleChange={handleChange}
              name="weekName"
              label="Week Name"
              error={errors?.weekName}
            />
            <Input
              value={values.weekDescription}
              handleChange={handleChange}
              name="weekDescription"
              label="Week Description"
              error={errors?.weekDescription}
            />
            <Input
              value={values.weekTags}
              handleChange={handleChange}
              name="weekTags"
              label="Week Tags"
              error={errors?.weekTags}
            />
            <Input
              value={values.weekDiet}
              handleChange={handleChange}
              name="weekDiet"
              label="Week Diet"
              error={errors?.weekDiet}
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

  if (!loading && Object.keys(weeks).length > 0) {
    return Component;
  } else if (error) {
    return <div>{error}</div>;
  }
  return <Spinner />;
};

export default WeekDetailsPage;
