import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { NavLink as RouterLink } from "react-router-dom";
import useStyles from "./styles";
import Toolbar from '@material-ui/core/Toolbar';

const Navbar = () => {
  const classes = useStyles();

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
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            MealShare
          </Typography>
          <nav>
            <Link
              variant="button"
              component={RouterLink}
              color="textPrimary"
              to="/plans"
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              Plans
            </Link>
            <Link
              variant="button"
              component={RouterLink}
              color="textPrimary"
              to="/recipes"
              className={classes.link}
              activeClassName={classes.activeClassName}
            >
              Recipes
            </Link>
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
          </nav>
          <Button
            component={RouterLink}
            to="/auth"
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
