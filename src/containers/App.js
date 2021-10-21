import React from 'react';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import Navbar from '../views/common/Navbar/Navbar';
import WeekDetailsPage from '../views/pages/WeekDetailsPage/WeekDetailsPage';
import WeekPage from '../views/pages/WeekPage/WeekPage';
import AuthPage from '../views/pages/AuthPage/AuthPage';
import RecipePage from '../views/pages/RecipePage/RecipePage';
import RecipeDetailsPage from '../views/pages/RecipeDetailsPage/RecipeDetailsPage';

import routes from '../constants/routes';

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div className={classes.root}>
        <Switch>
          <Route path={routes.HOME_PAGE} exact component={WeekPage} />
          <Route path={routes.WEEK_PAGE} exact component={WeekPage} />
          <Route
            path={routes.WEEK_DETAILS_PAGE}
            exact
            component={WeekDetailsPage}
          />
          <Route path={routes.RECIPE_PAGE} exact component={RecipePage} />
          <Route
            path={routes.RECIPE_DETAILS_PAGE}
            exact
            component={RecipeDetailsPage}
          />
          <Route path={routes.AUTH_PAGE} exact component={AuthPage} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
