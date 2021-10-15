import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
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
