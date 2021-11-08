import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import WeekDetails from '../../containers/WeekDetails/WeekDetails';
import Spinner from '../../common/Spinner/Spinner';
import { getWeek } from '../../../redux/actions/weekActions';
import { getAllRecipes } from '../../../redux/actions/recipeActions';

const WeekDetailsPage = () => {
  const { weekId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { week, loading } = useSelector((state) => state.week);
  const { recipes } = useSelector((state) => state.recipeList);

  useEffect(() => {
    if (!location.isRedirect) {
      dispatch(getWeek(weekId));
    }
    dispatch(getAllRecipes('?fields=recipeName'));
  }, []);

  if (!loading && week.days.length > 0 && recipes.length >= 0)
    return <WeekDetails week={week} recipes={recipes} />;
  return <Spinner />;
};

export default WeekDetailsPage;
