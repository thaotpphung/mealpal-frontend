import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Paper, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@mui/icons-material/Done';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from './styles';

const IngredientsCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ingredientFields, setIngredientFields] = useState(
    recipe.ingredients.length === 0 ? [''] : recipe.ingredients
  );
  const [isInEditMode, setIsInEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setIsInEditMode(!isInEditMode);
  };

  const handleChangeIngredientField = (event, ingredientIdx) => {
    const fields = [...ingredientFields];
    fields[ingredientIdx] = event.target.value;
    setIngredientFields(fields);
  };

  const handleDeleteIngredientField = (ingredientIdx) => {
    const fields = [...ingredientFields];
    fields.splice(ingredientIdx, 1);
    setIngredientFields(fields);
  };

  const handleAddIngredientField = () => {
    const fields = [...ingredientFields];
    fields.push('');
    setIngredientFields(fields);
  };

  const handleSubmitUpdateRecipe = () => {
    dispatch(updateRecipe(recipe._id, { ingredients: ingredientFields }));
    handleToggleEditMode();
  };

  return (
    <div className={classes.root}>
      Ingredients:
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
        {ingredientFields.map((ingredient, ingredientIdx) => {
          return (
            <>
              {!isInEditMode ? (
                <li key={`ingredient-official-${ingredientIdx}`}>
                  {ingredient}
                </li>
              ) : (
                <li key={`ingredient-field-${ingredientIdx}`}>
                  <TextField
                    variant="outlined"
                    value={ingredient}
                    onChange={(event) =>
                      handleChangeIngredientField(event, ingredientIdx)
                    }
                  />
                  <IconButton
                    onClick={() => handleDeleteIngredientField(ingredientIdx)}
                  >
                    <HighlightOffIcon className={classes.deleteIcon} />
                  </IconButton>
                  <IconButton onClick={handleAddIngredientField}>
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

export default IngredientsCard;
