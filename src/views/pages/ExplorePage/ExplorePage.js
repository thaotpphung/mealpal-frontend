import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import useStyles from './styles';
import WeekInfoCard from '../../components/WeekInfoCard/WeekInfoCard';

const ExplorePage = () => {
  const classes = useStyles();
  const { weeks } = useSelector((state) => state.weekList);

  return (
    <div>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {Object.values(weeks).map((week, weekIdx) => (
          <Grid
            key={`{'explore-page-${week._id}-${weekIdx}`}
            item
            xs={12}
            sm={4}
            md={4}
          >
            <WeekInfoCard week={week} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ExplorePage;
