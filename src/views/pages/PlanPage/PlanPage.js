import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import PlanList from '../../components/PlanList/PlanList';
import PlanPageHeader from '../../components/PlanPageHeader/PlanPageHeader';

const PlanPage = () => {
  // const dispatch = useDispatch();

  // const user = useSelector((state) => state.user).currentUser;

  useEffect(() => {}, []);

  // useEffect(() => {

  // }, [success])

  return (
    <div>
      <PlanPageHeader />
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={3}>
          <PlanList />
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <Menu /> */}
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <WeekList /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default PlanPage;
