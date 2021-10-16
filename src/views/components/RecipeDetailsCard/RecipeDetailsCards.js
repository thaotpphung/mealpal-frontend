import React from 'react';
import { useDispatch } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from '../../../containers/styles';
import useArray from '../../../utils/hooks/useArray';
import useToggle from '../../../utils/hooks/useToggle';
import RoundButton from '../../common/Buttons/RoundButton';
import CardHeader from '../../common/CardHeader/CardHeader';
import RecipeDetailsCardContent from './RecipeDetailsCardContent/RecipeDetailsCardContent';

const RecipeDetailsCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    array: ingredients,
    push: handleAddIngredient,
    remove: handleDeleteIngredient,
    update: handleChangeIngredient,
  } = useArray(recipe.ingredients.length === 0 ? [''] : recipe.ingredients);

  const {
    array: instructions,
    push: handleAddInstruction,
    remove: handleDeleteInstruction,
    update: handleChangeInstruction,
  } = useArray(recipe.instructions.length === 0 ? [''] : recipe.instructions);

  const [isInEditMode, toggleIsInEditMode] = useToggle(false);

  const handleSubmitUpdateRecipe = () => {
    dispatch(updateRecipe(recipe._id, { ingredients, instructions }));
    toggleIsInEditMode(false);
  };

  return (
    <Paper className={classes.notePaper}>
      <CardHeader
        title="Recipe Details"
        action={
          isInEditMode ? (
            <RoundButton
              type="done"
              handleClick={() => handleSubmitUpdateRecipe()}
            />
          ) : (
            <RoundButton type="edit" handleClick={() => toggleIsInEditMode()} />
          )
        }
      />
      <RecipeDetailsCardContent
        title="Ingredients"
        array={ingredients}
        handleChange={handleChangeIngredient}
        handleAdd={handleAddIngredient}
        handleDelete={handleDeleteIngredient}
        isInEditMode={isInEditMode}
      />

      <RecipeDetailsCardContent
        title="Instructions"
        array={instructions}
        handleChange={handleChangeInstruction}
        handleAdd={handleAddInstruction}
        handleDelete={handleDeleteInstruction}
        isInEditMode={isInEditMode}
      />
    </Paper>
  );
};

export default RecipeDetailsCard;
