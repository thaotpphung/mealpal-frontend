import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { NavLink as RouterLink } from "react-router-dom";
import useStyles from "./styles";
import Toolbar from "@material-ui/core/Toolbar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/userActions";

const Navbar = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { loading, currentUser, error } = user;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    history.push("/auth");
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
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            MealPal
          </Typography>
          <nav>
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
          {currentUser ? (
            <Button
              component={RouterLink}
              to="/auth"
              color="primary"
              variant="outlined"
              className={classes.link}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              component={RouterLink}
              to="/auth"
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
