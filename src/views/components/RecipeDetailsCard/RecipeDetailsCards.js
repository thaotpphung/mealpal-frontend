import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, TextField } from '@material-ui/core';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from '../../../containers/styles';
import { styles } from './styles';
import useArray from '../../../utils/hooks/useArray';
import useToggle from '../../../utils/hooks/useToggle';
import useForm from '../../../utils/hooks/useForm';
import { validateArray } from '../../../utils/validations/validateFunctions';
import RoundButton from '../../common/Buttons/RoundButton';
import CardHeader from '../../common/CardHeader/CardHeader';
import InstructionCard from './InstructionCard/InstructionCard';
import IngredientCard from './IngredientCard/IngredientCard';

const RecipeDetailsCard = ({ recipe }) => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const {
    array: ingredients,
    remove: handleDeleteIngredient,
    update: handleChangeIngredient,
    addAt: handleAddIngredient,
    reset: resetIngredients,
  } = useArray(
    recipe.ingredients.length === 0
      ? [
          {
            amount: 0,
            unit: { label: '' },
            food: '',
          },
        ]
      : recipe.ingredients
  );
  const {
    array: instructions,
    addAt: handleAddInstruction,
    remove: handleDeleteInstruction,
    update: handleChangeInstruction,
    reset: resetInstructions,
  } = useArray(recipe.instructions.length === 0 ? [''] : recipe.instructions);

  const [isInEditMode, toggleIsInEditMode] = useToggle(false);
  const { handleSubmit, errors } = useForm({}, () => {
    dispatch(updateRecipe(recipe._id, { ingredients, instructions }));
    toggleIsInEditMode(false);
  });

  const handleSubmitUpdateRecipe = (event) => {
    const errors = {};
    // validateArray('ingredients', ingredients, errors);
    console.log('ingredients', ingredients);
    validateArray('instructions', instructions, errors);
    handleSubmit(event, errors);
  };

  const handleCancelEdit = () => {
    resetInstructions();
    resetIngredients();
    toggleIsInEditMode(false);
  };

  const handleChangeIngredientEntry = (idx, item, key, value) => {
    handleChangeIngredient(idx, { ...item, [key]: value });
  };

  return (
    <Paper className={localClasses.notePaper}>
      <CardHeader
        action={
          <div>
            {isInEditMode ? (
              <>
                <RoundButton type="cancel" handleClick={handleCancelEdit} />
                <RoundButton
                  type="done"
                  handleClick={handleSubmitUpdateRecipe}
                />
              </>
            ) : (
              <RoundButton type="edit" handleClick={toggleIsInEditMode} />
            )}
          </div>
        }
      />
      <IngredientCard
        title="Ingredients"
        array={ingredients}
        handleChange={handleChangeIngredientEntry}
        handleAdd={handleAddIngredient}
        handleDelete={handleDeleteIngredient}
        isInEditMode={isInEditMode}
        errors={errors?.ingredients}
      />
      <InstructionCard
        title="Instructions"
        array={instructions}
        handleChange={handleChangeInstruction}
        handleAdd={handleAddInstruction}
        handleDelete={handleDeleteInstruction}
        isInEditMode={isInEditMode}
        errors={errors?.instructions}
      />
    </Paper>
  );
};

export default RecipeDetailsCard;
