import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import PlanIcon from '@material-ui/icons/EventNote';
import RecipeIcon from '@material-ui/icons/RestaurantMenu';
import CartIcon from '@material-ui/icons/ShoppingCart';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import { NavLink as RouterLink } from 'react-router-dom';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/actions/userActions';
import Logo from '../../../assets/logo/default-monochrome.svg';

const Navbar = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/auth');
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const mobileMenuId = 'primary-menu-mobile';
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          history.push('/');
        }}
      >
        <IconButton color="inherit">
          <HomeIcon />
        </IconButton>
        <Typography>Home</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push(
            loggedInUser ? `/users/${loggedInUser._id}/weeks` : `/weeks`
          );
        }}
      >
        <IconButton color="inherit">
          <PlanIcon />
        </IconButton>
        <Typography>Plans</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          history.push(
            loggedInUser ? `/users/${loggedInUser._id}/recipes` : `/recipes`
          );
        }}
      >
        <IconButton color="inherit">
          <RecipeIcon />
        </IconButton>
        <Typography>Recipes</Typography>
      </MenuItem>
      {loggedInUser && (
        <MenuItem
          onClick={() => {
            history.push('/cart');
          }}
        >
          <IconButton color="inherit">
            <CartIcon />
          </IconButton>
          <Typography>Cart</Typography>
        </MenuItem>
      )}
      {loggedInUser && (
        <MenuItem
          onClick={() => {
            history.push(`/users/${loggedInUser._id}/profile`);
          }}
        >
          <IconButton color="inherit">
            <ProfileIcon />
          </IconButton>
          <Typography>Profile</Typography>
        </MenuItem>
      )}
      {loggedInUser ? (
        <MenuItem onClick={handleLogout}>
          <IconButton>
            <LogoutIcon />
          </IconButton>
          <Typography>Log Out</Typography>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            history.push('/');
          }}
        >
          <IconButton color="inherit">
            <LogoutIcon />
          </IconButton>
          <Typography>Log Out</Typography>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      <div className={classes.grow}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          className={classes.appBar}
        >
          <Toolbar>
            <div className={classes.toolbarTitle}>
              <img
                src={Logo}
                className={classes.logo}
                onClick={() => history.push('/')}
              />
              <Chip
                variant="outlined"
                size="small"
                label="Beta"
                color="primary"
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
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
                  to={
                    loggedInUser ? `/users/${loggedInUser._id}/weeks` : `/weeks`
                  }
                  className={classes.link}
                  activeClassName={classes.activeClassName}
                >
                  Plans
                </Link>
                <Link
                  variant="button"
                  component={RouterLink}
                  color="textPrimary"
                  to={
                    loggedInUser
                      ? `/users/${loggedInUser._id}/recipes`
                      : `/recipes`
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
                    to={'/auth'}
                    color="primary"
                    variant="outlined"
                    className={classes.link}
                  >
                    Sign In
                  </Button>
                )}
              </nav>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    </>
  );
};

export default Navbar;
