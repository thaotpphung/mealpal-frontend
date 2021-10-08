import React from 'react';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import Navbar from '../views/common/Navbar/Navbar';

import HomePage from '../views/pages/HomePage/HomePage';
import ExplorePage from '../views/pages/ExplorePage/ExplorePage';
import NewWeekPage from '../views/pages/NewWeekPage/NewWeekPage';
import EditDayPage from '../views/pages/EditDayPage/EditDayPage';
import AuthPage from '../views/pages/AuthPage/AuthPage';
import routes from '../constants/routes';

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div className={classes.root}>
        <Switch>
          <Route path={routes.HOME_PAGE} exact component={HomePage} />
          <Route path={routes.EXPLORE_PAGE} exact component={ExplorePage} />
          <Route path={routes.NEW_WEEK_PAGE} exact component={NewWeekPage} />
          <Route path={routes.EDIT_DAY_PAGE} exact component={EditDayPage} />
          <Route path={routes.AUTH_PAGE} exact component={AuthPage} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
