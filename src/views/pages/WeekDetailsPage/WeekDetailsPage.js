import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import WeekDetails from '../../containers/WeekDetails/WeekDetails';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import { getWeek } from '../../../redux/actions/weekActions';
import { getAllRecipesForSearching } from '../../../redux/actions/recipeActions';

const WeekDetailsPage = () => {
  const { weekId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { week, loading, error } = useSelector((state) => state.week);
  const { recipes } = useSelector((state) => state.recipeSearchList);

  useEffect(() => {
    if (!location.isRedirect) {
      dispatch(getWeek(weekId));
    }
    dispatch(getAllRecipesForSearching('?fields=name,calories,ingredients'));
  }, []);

  if (!loading && error) return <EmptyMessage />;
  if (!loading && week.days.length > 0 && recipes.length >= 0)
    return <WeekDetails week={week} recipes={recipes} />;
  return <Spinner />;
};

export default WeekDetailsPage;
