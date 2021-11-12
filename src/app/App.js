import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, Router } from 'react-router-dom';
import useStyles from './styles';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
import Navbar from '../views/common/Navbar/Navbar';
import Footer from '../views/common/Footer/Footer';
import FlashMessage from '../views/common/FlashMessage/FlashMessage';
import WeekDetailsPage from '../views/pages/WeekDetailsPage/WeekDetailsPage';
import WeekPage from '../views/pages/WeekPage/WeekPage';
import HomePage from '../views/pages/HomePage/HomePage';
import CartPage from '../views/pages/CartPage/CartPage';
import AuthPage from '../views/pages/AuthPage/AuthPage';
import ProfilePage from '../views/pages/ProfilePage/ProfilePage';
import RecipePage from '../views/pages/RecipePage/RecipePage';
import NotFoundPage from '../views/pages/NotFoundPage/NotFoundPage';
import SuccessPage from '../views/pages/SuccessPage/SuccessPage';
import RecipeDetailsPage from '../views/pages/RecipeDetailsPage/RecipeDetailsPage';

function App() {
  const classes = useStyles();
  const { loggedInUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Navbar />
        <div className={classes.container}>
          <FlashMessage />
          <Switch>
            <Route path="/" exact component={HomePage} />
            {['/users/:userId/weeks', '/weeks'].map((route) => (
              <Route key={route} path={route} exact component={WeekPage} />
            ))}
            {['/users/:userId/weeks/:weekId', '/weeks/:weekId'].map((route) => (
              <Route
                key={route}
                path={route}
                exact
                component={WeekDetailsPage}
              />
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
            <Route
              path="/users/:userId/profile"
              exact
              component={ProfilePage}
            />
            {loggedInUser && <Route path="/cart" exact component={CartPage} />}
            <Route path="/auth" exact component={AuthPage} />
            {loggedInUser && (
              <Route
                path="/users/:userId/success"
                exact
                component={SuccessPage}
              />
            )}
            <Route path={'/404'} exact component={NotFoundPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
