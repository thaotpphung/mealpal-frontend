import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Paper, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from './styles';

const InstructionsCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [instructionFields, setInstructionFields] = useState(
    recipe.instructions.length === 0 ? [''] : recipe.instructions
  );
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setIsInEditMode(!isInEditMode);
  };

  const handleChangeInstructionField = (event, instructionIdx) => {
    const fields = [...instructionFields];
    fields[instructionIdx] = event.target.value;
    setInstructionFields(fields);
  };

  const handleDeleteInstructionField = (instructionIdx) => {
    const fields = [...instructionFields];
    fields.splice(instructionIdx, 1);
    setInstructionFields(fields);
  };

  const handleAddInstructionField = () => {
    const fields = [...instructionFields];
    fields.push('');
    setInstructionFields(fields);
  };

  const handleSubmitUpdateRecipe = () => {
    dispatch(updateRecipe(recipe._id, { instructions: instructionFields }));
    handleToggleEditMode();
  };

  return (
    <div className={classes.root}>
      Instructions:
      {isInEditMode ? (
        <IconButton onClick={() => handleSubmitUpdateRecipe()}>
          <DoneIcon />
        </IconButton>
      ) : (
        <IconButton onClick={() => handleToggleEditMode()}>
          <EditIcon />
        </IconButton>
      )}
      <ul>
        {instructionFields.map((instruction, instructionIdx) => {
          return (
            <>
              {!isInEditMode ? (
                <li key={`instruction-official-${instructionIdx}`}>
                  {instruction}
                </li>
              ) : (
                <li key={`instruction-field-${instructionIdx}`}>
                  <TextField
                    variant="outlined"
                    value={instruction}
                    onChange={(event) =>
                      handleChangeInstructionField(event, instructionIdx)
                    }
                  />
                  <IconButton
                    onClick={() => handleDeleteInstructionField(instructionIdx)}
                  >
                    <HighlightOffIcon className={classes.deleteIcon} />
                  </IconButton>
                  <IconButton onClick={handleAddInstructionField}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                </li>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default InstructionsCard;
