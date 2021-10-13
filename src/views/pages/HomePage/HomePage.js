import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import WeekList from '../../components/WeekList/WeekList';
import Menu from '../../components/Menu/Menu';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';
import { setSelectedWeek } from '../../../redux/actions/selectActions';

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedWeek } = useSelector((state) => state.select);
  const { weeks } = useSelector((state) => state.weekList);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => dispatch(setSelectedWeek(currentUser.currentWeek)), []);

  return (
    <div>
      <Grid container justify="space-between" alignItems="stretch" spacing={7}>
        <Grid item xs={12} sm={4} className={classes.leftColumn}>
          <WeekInfoCard week={weeks[selectedWeek.id]} />
          <WeekList />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Menu />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
