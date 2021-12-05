import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BookmarkIcon from '@material-ui/icons/Bookmarks';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

import useStyles from './styles';

const RoundButton = ({ type, handleClick, loading, ...props }) => {
  const classes = useStyles();

  const roundButtonTypes = {
    delete: <DeleteIcon />,
    done: <CheckCircleIcon />,
    edit: <EditIcon />,
    deleteField: <HighlightOffIcon className={classes.delete} />,
    addField: <AddCircleOutlineIcon />,
    like: <FavoriteIcon />,
    setDefault: <StarOutlineIcon />,
    default: <StarIcon />,
    add: <AddCircleIcon />,
    cancel: <CancelIcon />,
    shoppingCart: <ShoppingCartIcon />,
    duplicate: <LibraryAddIcon />,
    avatar: <AccountCircleIcon />,
    expandLess: <ExpandLessIcon />,
    expandMore: <ExpandMoreIcon />,
    send: <SendIcon />,
    more: <MoreVertIcon />,
    save: <BookmarkIcon />,
    menu: <MenuIcon />,
  };

  return (
    <IconButton
      {...props}
      onClick={handleClick}
      disabled={loading}
      className={`${classes.roundButton}`}
    >
      {roundButtonTypes[type]}
    </IconButton>
  );
};

export default RoundButton;
