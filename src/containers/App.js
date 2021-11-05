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
          {loggedInUser && <Route path="/" exact component={HomePage} />}
          {['/users/:userId/weeks', '/weeks'].map((route) => (
            <Route key={route} path={route} exact component={WeekPage} />
          ))}
          {['/users/:userId/weeks/:weekId', '/weeks/:weekId'].map((route) => (
            <Route key={route} path={route} exact component={WeekDetailsPage} />
          ))}
          {['/users/:userId/recipes', '/recipes'].map((route) => (
            <Route key={route} path={route} exact component={RecipePage} />
          ))}
          {['/users/:userId/recipes/:recipeId', '/recipes/:recipeId'].map(
            (route) => (
              <Route
                key={route}
                path={route}
                exact
                component={RecipeDetailsPage}
              />
            )
          )}
          <Route path="/auth" exact component={AuthPage} />
          <Route path="/users/:userId/profile" exact component={ProfilePage} />
          <Route path={'/404'} exact component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
