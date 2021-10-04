import React from 'react';
// import { useSelector } from 'react-redux';
// import useStyles from './styles';
import { Grid } from '@material-ui/core';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PlanPosts from '../../components/PlanPosts/PlanPosts';
import FriendList from '../../components/FriendList/FriendList';

const Home = () => {
  // const classes = useStyles();
  // const user = useSelector((state) => state.user);
  // const { success } = user;
  return (
    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
      <Grid item xs={12} sm={8}>
        <PlanPosts />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FriendList />
      </Grid>
    </Grid>
  );
};

export default Home;
