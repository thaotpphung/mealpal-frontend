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

// import React from 'react';
// import { alpha, makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
// import Badge from '@material-ui/core/Badge';
// import MenuItem from '@material-ui/core/MenuItem';
// import Menu from '@material-ui/core/Menu';
// import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import MoreIcon from '@material-ui/icons/MoreVert';
// import HomeIcon from '@material-ui/icons/Home';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
// import MenuBookIcon from '@material-ui/icons/MenuBook';
// import ExploreIcon from '@material-ui/icons/Explore';

// const useStyles = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: theme.palette.common.white,
//     '&:hover': {
//       backgroundColor: theme.palette.common.white,
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('md')]: {
//       display: 'flex',
//     },
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('md')]: {
//       display: 'none',
//     },
//   },
// }));

// export default function PrimarySearchAppBar() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         <IconButton aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="secondary">
//             <HomeIcon />
//           </Badge>
//         </IconButton>
//         <p>Home</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="secondary">
//             <HomeIcon />
//           </Badge>
//         </IconButton>
//         <p>Explore</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton aria-label="show 11 new notifications" color="inherit">
//           <Badge badgeContent={11} color="secondary">
//             <MenuBookIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p>
//       </MenuItem>
//       <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem>
//     </Menu>
//   );

//   return (
//     <div className={classes.grow}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//             MealPal
//           </Typography>
//           {/* <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </div> */}
//           <div className={classes.grow} />
//           <div className={classes.sectionDesktop}>
//             <IconButton color="inherit">
//               <Badge color="secondary">
//                 <HomeIcon />
//               </Badge>
//             </IconButton>
//             <IconButton color="inherit">
//               <Badge color="secondary">
//                 <ExploreIcon />
//               </Badge>
//             </IconButton>
//             <IconButton color="inherit">
//               <Badge color="secondary">
//                 <MenuBookIcon />
//               </Badge>
//             </IconButton>
//             <IconButton
//               edge="end"
//               aria-label="account of current user"
//               aria-controls={menuId}
//               aria-haspopup="true"
//               onClick={handleProfileMenuOpen}
//               color="inherit"
//             >
//               <AccountCircle />
//             </IconButton>
//           </div>
//           <div className={classes.sectionMobile}>
//             <IconButton
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//     </div>
//   );
// }
