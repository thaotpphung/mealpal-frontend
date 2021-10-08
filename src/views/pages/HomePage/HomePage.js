import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import useStyles from './styles';

import PlanList from '../../components/PlanList/PlanList';
import WeekList from '../../components/WeekList/WeekList';
import Menu from '../../components/Menu/Menu';
import PlanPageHeader from '../../components/PlanPageHeader/PlanPageHeader';
import WeekInfo from '../../components/WeekInfo/WeekInfo';

const HomePage = () => {
  const classes = useStyles();
  useEffect(() => {}, []);

  return (
    <div>
      <Grid container justify="space-between" alignItems="stretch" spacing={7}>
        <Grid item xs={12} sm={4} className={classes.leftColumn}>
          <WeekInfo />
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
