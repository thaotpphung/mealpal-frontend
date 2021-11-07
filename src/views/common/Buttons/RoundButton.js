import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import useStyles from './styles';

const RoundButton = ({ type, handleClick, noPadding = false, ...props }) => {
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
    duplicate: <ControlPointDuplicateIcon />,
    avatar: <AccountCircleIcon />,
  };

  return (
    <IconButton
      onClick={handleClick}
      className={`${classes.roundButton} ${noPadding && classes.noPadding}`}
    >
      {roundButtonTypes[type]}
    </IconButton>
  );
};

export default RoundButton;
