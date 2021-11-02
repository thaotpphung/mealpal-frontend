import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import DayList from '../../components/DayList/DayList';
import WeekInfoCard from '../../components/WeekCard/WeekCard';
import Spinner from '../../common/Spinner/Spinner';
import { getWeek } from '../../../redux/actions/weekActions';
import { getAllRecipes } from '../../../redux/actions/recipeActions';

const WeekDetailsPage = () => {
  const { weekId } = useParams();
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const { week, loading, error } = useSelector((state) => state.weekDetails);
  const { recipes } = useSelector((state) => state.recipeList);

  useEffect(() => {
    if (!location.isRedirect) {
      dispatch(getWeek(weekId));
    }
    dispatch(getAllRecipes());
  }, []);

  if (error) return <div>{error}</div>;
  if (!loading && Object.keys(week).length > 0 && recipes.length >= 0)
    return (
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
  return <Spinner />;
};

export default WeekDetailsPage;
