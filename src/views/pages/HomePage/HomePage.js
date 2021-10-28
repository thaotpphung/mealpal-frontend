import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './styles';
import DayList from '../../components/DayList/DayList';
import WeekInfoCard from '../../components/WeekCard/WeekCard';
import Spinner from '../../common/Spinner/Spinner';
import { getWeek } from '../../../redux/actions/weekActions';
import { getAllRecipes } from '../../../redux/actions/recipeActions';

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { week, loading, error } = useSelector((state) => state.weekDetails);
  const { currentUser } = useSelector((state) => state.user);
  const { recipes } = useSelector((state) => state.recipeList);

  useEffect(() => {
    dispatch(getWeek(currentUser.currentWeek));
    dispatch(getAllRecipes());
  }, []);

  const Component = (
    <Grid
      container
      justifyContent="space-between"
      alignItems="stretch"
      spacing={7}
    >
      <Grid item xs={12} sm={4} className={classes.leftColumn}>
        <WeekInfoCard week={week} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <DayList days={week.days} recipes={recipes} />
      </Grid>
    </Grid>
  );

  if (!loading && week.days.length > 0) {
    return Component;
  } else if (error) {
    return <div>{error}</div>;
  }
  return <Spinner />;
};

export default HomePage;
