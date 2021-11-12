import React, { useEffect } from 'react';
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
      spacing={7}
    >
      <Grid item sm={12} md={4} className={classes.leftColumn}>
        <WeekCard week={week} />
      </Grid>
      <Grid item sm={12} md={8}>
        <DayList days={week.days} recipes={recipes} userId={week.userId} />
      </Grid>
    </Grid>
  );
};

export default WeekDetails;
