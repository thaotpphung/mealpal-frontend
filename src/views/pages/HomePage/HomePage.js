import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeekDetails from '../../containers/WeekDetails/WeekDetails';
import Home from '../../containers/Home/Home';
import Spinner from '../../common/Spinner/Spinner';
import { getWeek } from '../../../redux/actions/weekActions';
import { getAllRecipes } from '../../../redux/actions/recipeActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const { week, loading } = useSelector((state) => state.week);
  const { loggedInUser, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { recipes } = useSelector((state) => state.recipeList);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(getWeek(loggedInUser.currentWeek));
      dispatch(getAllRecipes());
    }
  }, []);

  if (!userLoading && !loggedInUser) return <Home />;
  if (
    !userLoading &&
    loggedInUser &&
    !loading &&
    week.days.length > 0 &&
    recipes.length >= 0
  )
    return <WeekDetails week={week} recipes={recipes} />;
  return <Spinner />;
};

export default HomePage;
