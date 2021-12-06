import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import { getWeek } from '../../../redux/actions/weekActions';
import { getAllRecipesForSearching } from '../../../redux/actions/recipeActions';
import DayList from '../../containers/DayList/DayList';
import WeekCard from '../../components/WeekCard/WeekCard';
import useStyles from './styles';

const WeekDetailsPage = ({ id = '' }) => {
  const { weekId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { week, loading, error } = useSelector((state) => state.week);
  const { recipes } = useSelector((state) => state.recipeSearchList);

  useEffect(() => {
    if (!location.isRedirect) {
      dispatch(getWeek(weekId ? weekId : id));
    }
    dispatch(getAllRecipesForSearching('?fields=name,calories,ingredients'));
  }, []);

  if (!loading && error) return <EmptyMessage />;
  if (!loading && week.days.length > 0 && recipes.length >= 0)
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
        spacing={5}
        className={classes.weekContainer}
      >
        <Grid item xs={12} md={4} className={classes.leftColumn}>
          <WeekCard week={week} recipes={recipes} />
        </Grid>
        <Grid item xs={12} md={8}>
          <DayList
            days={week.days}
            recipes={location.recipes ? location.recipes : recipes}
            userId={week.userId}
          />
        </Grid>
      </Grid>
    );
  return <Spinner />;
};

export default WeekDetailsPage;
