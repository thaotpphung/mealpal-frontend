import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PlanPost from './PlanPost/PlanPost';
import useStyles from './styles';

const plans = [
  {
    _id: "1",
    userId: "1",
    title: "Keto Plan",
    description: "This plan I created for week 1",
    createdTime: "September 21"
  },
  {
    _id: "2",
    userId: "2",
    title: "Keto Plan",
    description: "This plan I created for week 1",
    createdTime: "September 21"
  },
  {
    _id: "3",
    userId: "3",
    title: "Keto Plan",
    description: "This plan I created for week 1",
    createdTime: "September 21"
  },
  {
    _id: "4",
    userId: "4",
    title: "Keto Plan",
    description: "This plan I created for week 1",
    createdTime: "September 21"
  },
]

const PlanPosts = () => {
  const classes = useStyles();

  return (
    !plans.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {plans.map((plan) => (
          <Grid key={plan._id} item xs={12} sm={6} md={6}>
            <PlanPost plan={plan}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default PlanPosts;

