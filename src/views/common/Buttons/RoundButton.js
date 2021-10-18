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

import useStyles from './styles';

const RoundButton = ({ type, handleClick }) => {
  const classes = useStyles();

  const roundButtonTypes = {
    delete: <DeleteIcon />,
    done: <DoneIcon />,
    edit: <EditIcon />,
    deleteField: <HighlightOffIcon className={classes.deleteFieldButton} />,
    addField: <AddCircleOutlineIcon />,
    like: <FavoriteIcon />,
    setDefault: <StarIcon />,
    add: <AddIcon />,
  };

  return (
    <IconButton onClick={handleClick}>{roundButtonTypes[type]}</IconButton>
  );
};

export default RoundButton;
