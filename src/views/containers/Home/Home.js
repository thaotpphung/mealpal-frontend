import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import DietLogo from '../../../assets/home/undraw_diet.svg';
import EatingTogetherLogo from '../../../assets/home/undraw_eating_together.svg';
import ShoppingLogo from '../../../assets/home/undraw_shopping_app.svg';
import BlockButton from '../../../views/common/Buttons/BlockButton';

const Home = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={7}
        className={classes.root}
      >
        {/* 1st Row - Short Intro */}
        <Grid item xs={12} sm={6} className={classes.rowCenter}>
          <Typography variant="h3">Meal Prep Made Easy</Typography>
          <Typography variant="h5">
            Track and shop for your meal plans in a breeze with MealPal
          </Typography>
          <BlockButton
            width="fit-content"
            handleClick={() => {
              history.push({
                pathname: '/auth',
                isRedirect: true,
              });
            }}
          >
            Sign Up
          </BlockButton>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={DietLogo} alt="App Illustration" className={classes.logo} />
        </Grid>
        {/* 2nd Row - Features - track and view meal plans & recipes*/}
        <Grid item xs={12} sm={6}>
          <img
            src={EatingTogetherLogo}
            alt="App Illustration"
            className={classes.logo}
          />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.rowCenter}>
          <Typography variant="h4">Meal Plans and Recipes</Typography>
          <Typography variant="h5">
            Share and get inspiration from others
          </Typography>
        </Grid>
        {/* 3rd Row - Features - shopping cart s*/}
        <Grid item xs={12} sm={6} className={classes.rowCenter}>
          <Typography variant="h4">Shopping List</Typography>
          <Typography variant="h5">
            Automatically generated shopping list
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src={ShoppingLogo}
            alt="App Illustration"
            className={classes.logo}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
