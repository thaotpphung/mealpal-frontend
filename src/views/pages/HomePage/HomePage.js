import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeekDetails from '../../containers/WeekDetails/WeekDetails';
import Home from '../../containers/Home/Home';
import Spinner from '../../common/Spinner/Spinner';
import EmptyMessage from '../../common/EmptyMessage/EmptyMessage';
import { getWeek } from '../../../redux/actions/weekActions';

const HomePage = () => {
  const dispatch = useDispatch();
  const { week, loading, error } = useSelector((state) => state.week);
  const { loggedInUser, loading: userLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (loggedInUser) {
      dispatch(getWeek(loggedInUser.currentWeek));
    }
  }, []);

  if (!loading && error) return <EmptyMessage />;
  if (!userLoading && !loggedInUser) return <Home />;
  if (!userLoading && loggedInUser && !loading && week.days.length > 0)
    return <WeekDetails week={week} recipes={[]} />;
  return <Spinner />;
};

export default HomePage;
