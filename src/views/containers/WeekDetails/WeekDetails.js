import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import DayList from '../../components/DayList/DayList';
import WeekCard from '../../components/WeekCard/WeekCard';

const WeekDetails = ({ week, recipes }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="stretch"
      spacing={5}
      className={classes.weekContainer}
    >
      <Grid item xs={12} md={4} className={classes.leftColumn}>
        <WeekCard week={week} />
      </Grid>
      <Grid item xs={12} md={8}>
        <DayList days={week.days} recipes={recipes} userId={week.userId} />
      </Grid>
    </Grid>
  );
};

export default WeekDetails;
