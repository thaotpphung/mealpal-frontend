import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from '../../../containers/styles';
import useArray from '../../../utils/hooks/useArray';
import useToggle from '../../../utils/hooks/useToggle';
import { validateArray } from '../../../utils/validations/validateFunctions';
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
  const [ingredientErrors, setIngredientErrors] = useState({});
  const [instructionErrors, setInstructionErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitUpdateRecipe = () => {
    const errors = {};
    validateArray('ingredients', ingredients, errors).ingredients;
    validateArray('instructions', instructions, errors).instructions;
    setIngredientErrors({ ...errors.ingredients });
    setInstructionErrors({ ...errors.instructions });
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (
      Object.keys(ingredientErrors).length === 0 &&
      Object.keys(instructionErrors).length === 0 &&
      isSubmitting
    ) {
      dispatch(updateRecipe(recipe._id, { ingredients, instructions }));
      toggleIsInEditMode(false);
      setIsSubmitting(false);
    }
  }, [ingredientErrors, instructionErrors]);

  return (
    <Paper className={classes.notePaper}>
      <CardHeader
        title="Recipe Details"
        action={
          isInEditMode ? (
            <RoundButton
              type="done"
              handleClick={() => {
                handleSubmitUpdateRecipe();
              }}
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
        errors={ingredientErrors}
      />
      <RecipeDetailsCardContent
        title="Instructions"
        array={instructions}
        handleChange={handleChangeInstruction}
        handleAdd={handleAddInstruction}
        handleDelete={handleDeleteInstruction}
        isInEditMode={isInEditMode}
        errors={instructionErrors}
      />
    </Paper>
  );
};

export default RecipeDetailsCard;
