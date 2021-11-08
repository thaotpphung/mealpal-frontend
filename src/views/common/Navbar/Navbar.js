import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { NavLink as RouterLink } from 'react-router-dom';
import useStyles from './styles';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';

const Navbar = () => {
  const classes = useStyles();
  const { loggedInUser } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth');
  };

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            className={classes.toolbarTitle}
            variant="h6"
            color="inherit"
            noWrap
          >
            MealPal
          </Typography>
          <nav className={classes.navLeft}>
            <Link
              variant="button"
              component={RouterLink}
              color="textPrimary"
              exact
              to="/"
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              Home
            </Link>
            <Link
              variant="button"
              component={RouterLink}
              color="textPrimary"
              to={loggedInUser ? `/users/${loggedInUser._id}/weeks` : `/weeks`}
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              MealPlans
            </Link>
            <Link
              variant="button"
              component={RouterLink}
              color="textPrimary"
              to={
                loggedInUser ? `/users/${loggedInUser._id}/recipes` : `/recipes`
              }
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              Recipes
            </Link>
            {loggedInUser && (
              <Link
                variant="button"
                component={RouterLink}
                color="textPrimary"
                to="/cart"
                className={classes.link}
                activeClassName={classes.activeClassName}
              >
                Cart
              </Link>
            )}
          </nav>
          {loggedInUser ? (
            <>
              <Link
                variant="button"
                component={RouterLink}
                color="textPrimary"
                to={`/users/${loggedInUser._id}/profile`}
                className={classes.link}
                activeClassName={classes.activeClassName}
              >
                Profile
              </Link>
              <Button
                component={RouterLink}
                to="/auth"
                color="primary"
                variant="outlined"
                className={classes.link}
                onClick={handleLogout}
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              component={RouterLink}
              to={'auth'}
              color="primary"
              variant="outlined"
              className={classes.link}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
