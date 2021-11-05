import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { addAlertWithTimeout } from '../redux/actions/alertActions';
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
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      if (!location.pathname.includes('auth')) {
        history.push('/auth');
        dispatch(
          addAlertWithTimeout('error', 'You need to sign in to do that')
        );
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div className={classes.root}>
        <FlashMessage />
        <Switch>
          {currentUser && (
            <Route path={routes.HOME_PAGE} exact component={HomePage} />
          )}
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
          <Route path={routes.PROFILE_PAGE} exact component={ProfilePage} />
          <Route path={'/404'} exact component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
