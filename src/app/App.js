import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
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
import LandingPage from '../views/pages/LandingPage/LandingPage';
import CartPage from '../views/pages/CartPage/CartPage';
import ProfilePage from '../views/pages/ProfilePage/ProfilePage';
import RecipePage from '../views/pages/RecipePage/RecipePage';
import NotFoundPage from '../views/pages/NotFoundPage/NotFoundPage';
import SuccessPage from '../views/pages/SuccessPage/SuccessPage';
import RecipeDetailsPage from '../views/pages/RecipeDetailsPage/RecipeDetailsPage';

import ForgotPasswordPage from '../views/pages/Auth/ForgotPasswordPage';
import ResetPasswordPage from '../views/pages/Auth/ResetPasswordPage';
import SignInPage from '../views/pages/Auth/SignInPage';
import SignUpPage from '../views/pages/Auth/SignUpPage';

function App() {
  const classes = useStyles();
  const { loggedInUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Navbar />
        <FlashMessage />
        <div className={classes.container}>
          <Switch>
            {/* Home Page */}
            <Route
              path="/"
              exact
              component={
                !loggedInUser
                  ? LandingPage
                  : () => <WeekDetailsPage id={loggedInUser.currentWeek} />
              }
            />
            {/* All Week Page */}
            {['/users/:userId/weeks', '/weeks'].map((route) => (
              <Route key={route} path={route} exact component={WeekPage} />
            ))}
            {/* Week Details Page */}
            {['/users/:userId/weeks/:weekId', '/weeks/:weekId'].map((route) => (
              <Route
                key={route}
                path={route}
                exact
                component={WeekDetailsPage}
              />
            ))}
            {/* All Recipes Page */}
            {['/users/:userId/recipes', '/recipes'].map((route) => (
              <Route key={route} path={route} exact component={RecipePage} />
            ))}
            {/* Recipe Details Page */}
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
            {/* User Profile */}
            <Route
              path="/users/:userId/profile"
              exact
              component={ProfilePage}
            />
            {/* Cart Page */}
            {loggedInUser && <Route path="/cart" exact component={CartPage} />}
            {/* Sign In Page */}
            <Route path="/signin" exact component={SignInPage} />
            {/* Sign Up Page */}
            <Route path="/signup" exact component={SignUpPage} />
            {/* Forgot Password Page */}
            <Route
              path="/password/reset"
              exact
              component={ForgotPasswordPage}
            />
            {/* Reset Password Page */}
            <Route
              path="/password/reset/:token"
              exact
              component={ResetPasswordPage}
            />
            {/* Success Page */}
            {loggedInUser && (
              <Route
                path="/users/:userId/success"
                exact
                component={SuccessPage}
              />
            )}
            {/* 404 Error Page */}
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
