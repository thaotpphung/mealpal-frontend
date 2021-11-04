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
import routes from '../../../constants/routes';

const Navbar = () => {
  const classes = useStyles();
  const { currentUser } = useSelector((state) => state.user);
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
              to={routes.HOME_PAGE}
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              Home
            </Link>
            <Link
              variant="button"
              component={RouterLink}
              color="textPrimary"
              to={routes.WEEK_PAGE}
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              MealPlans
            </Link>
            <Link
              variant="button"
              component={RouterLink}
              color="textPrimary"
              to={routes.RECIPE_PAGE}
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              Recipes
            </Link>
            <Link
              variant="button"
              component={RouterLink}
              color="textPrimary"
              to={routes.CART_PAGE}
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              Cart
            </Link>
          </nav>
          {currentUser ? (
            <>
              <Link
                variant="button"
                component={RouterLink}
                color="textPrimary"
                to={`/users/${currentUser._id}`}
                className={classes.link}
                activeClassName={classes.activeClassName}
              >
                Profile
              </Link>
              <Button
                component={RouterLink}
                to={routes.AUTH_PAGE}
                color="primary"
                variant="outlined"
                className={classes.link}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={RouterLink}
              to={routes.AUTH_PAGE}
              color="primary"
              variant="outlined"
              className={classes.link}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
