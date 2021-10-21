import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Paper, TextField } from '@material-ui/core';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from '../../../containers/styles';
import useArray from '../../../utils/hooks/useArray';
import useToggle from '../../../utils/hooks/useToggle';
import useForm from '../../../utils/hooks/useForm';

import { validateArray } from '../../../utils/validations/validateFunctions';
import RoundButton from '../../common/Buttons/RoundButton';
import CardHeader from '../../common/CardHeader/CardHeader';
import RecipeDetailsCardContent from './RecipeDetailsCardContent/RecipeDetailsCardContent';

const RecipeDetailsCard = ({ recipe }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    array: ingredients,
    remove: handleDeleteIngredient,
    update: handleChangeIngredient,
    addAt: handleAddIngredient,
  } = useArray(recipe.ingredients.length === 0 ? [''] : recipe.ingredients);
  const {
    array: instructions,
    addAt: handleAddInstruction,
    remove: handleDeleteInstruction,
    update: handleChangeInstruction,
  } = useArray(recipe.instructions.length === 0 ? [''] : recipe.instructions);

  const [isInEditMode, toggleIsInEditMode] = useToggle(false);
  const { handleSubmit, errors } = useForm({}, () => {
    dispatch(updateRecipe(recipe._id, { ingredients, instructions }));
    toggleIsInEditMode(false);
  });

  const handleSubmitUpdateRecipe = (event) => {
    const errors = {};
    validateArray('ingredients', ingredients, errors);
    validateArray('instructions', instructions, errors);
    handleSubmit(event, errors);
  };

  return (
    <Paper className={classes.notePaper}>
      {/* <CardHeader
        title="Recipe Details"
        action={
          isInEditMode ? (
            <RoundButton type="done" handleClick={handleSubmitUpdateRecipe} />
          ) : (
            <RoundButton type="edit" handleClick={toggleIsInEditMode} />
          )
        }
      /> */}
      <div style={{ float: 'right' }}>
        {isInEditMode ? (
          <RoundButton type="done" handleClick={handleSubmitUpdateRecipe} />
        ) : (
          <RoundButton type="edit" handleClick={toggleIsInEditMode} />
        )}
      </div>

      <RecipeDetailsCardContent
        title="Ingredients"
        array={ingredients}
        handleChange={handleChangeIngredient}
        handleAdd={handleAddIngredient}
        handleDelete={handleDeleteIngredient}
        isInEditMode={isInEditMode}
        errors={errors?.ingredients}
      />
      <RecipeDetailsCardContent
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
