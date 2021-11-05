import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import Navbar from '../views/common/Navbar/Navbar';
import FlashMessage from '../views/common/FlashMessage/FlashMessage';
import WeekDetailsPage from '../views/pages/WeekDetailsPage/WeekDetailsPage';
import WeekPage from '../views/pages/WeekPage/WeekPage';
import HomePage from '../views/pages/HomePage/HomePage';
import AuthPage from '../views/pages/AuthPage/AuthPage';
import ProfilePage from '../views/pages/ProfilePage/ProfilePage';
import RecipePage from '../views/pages/RecipePage/RecipePage';
import NotFoundPage from '../views/pages/NotFoundPage/NotFoundPage';
import RecipeDetailsPage from '../views/pages/RecipeDetailsPage/RecipeDetailsPage';
import routes from '../constants/routes';

function App() {
  const classes = useStyles();
  const { loggedInUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div className={classes.root}>
        <FlashMessage />
        <Switch>
          {loggedInUser && (
            <Route path={routes.HOME_PAGE} exact component={HomePage} />
          )}
          {routes.WEEK_PAGE.map((route) => (
            <Route key={route} path={route} exact component={WeekPage} />
          ))}
          <Route
            path={routes.WEEK_DETAILS_PAGE}
            exact
            component={WeekDetailsPage}
          />
          {routes.RECIPE_PAGE.map((route) => (
            <Route key={route} path={route} exact component={RecipePage} />
          ))}
          <Route
            path={routes.RECIPE_DETAILS_PAGE}
            exact
            component={RecipeDetailsPage}
          />
          <Route path={routes.AUTH_PAGE} exact component={AuthPage} />
          <Route path={routes.PROFILE_PAGE} exact component={ProfilePage} />
          <Route path={'/404'} exact component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
