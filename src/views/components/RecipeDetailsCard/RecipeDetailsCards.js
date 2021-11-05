import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import useStyles from '../../../containers/styles';
import { styles } from './styles';
import useArray from '../../../utils/hooks/useArray';
import useEditMode from '../../../utils/hooks/useEditMode';
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
  const { loggedInUser } = useSelector((state) => state.user);
  const initialIngredient = {
    amount: 0,
    unit: { label: 'kg' },
    food: '',
  };
  const {
    array: ingredients,
    remove: handleDeleteIngredient,
    update: handleChangeIngredient,
    addAt: handleAddIngredient,
    reset: resetIngredients,
  } = useArray(
    recipe.ingredients.length === 0
      ? [{ ...initialIngredient }]
      : recipe.ingredients
  );
  const {
    array: instructions,
    addAt: handleAddInstruction,
    remove: handleDeleteInstruction,
    update: handleChangeInstruction,
    reset: resetInstructions,
  } = useArray(recipe.instructions.length === 0 ? [''] : recipe.instructions);

  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      resetInstructions();
      resetIngredients();
    }
  );
  const { handleSubmit, errors } = useForm({}, () => {
    dispatch(updateRecipe(recipe._id, { ingredients, instructions }));
    toggleOpenEditMode(false);
  });

  const handleSubmitUpdateRecipe = (event) => {
    const errors = {};
    validateArray('ingredients', ingredients, errors, (item) => {
      return (
        !String(item.whole) ||
        !String(item.numer) ||
        !String(item.denom) ||
        !item.unit.label ||
        !item.food ||
        item.food.trim() === ''
      );
    });
    validateArray('instructions', instructions, errors);
    handleSubmit(event, errors);
  };

  const handleChangeIngredientEntry = (idx, item, key, value) => {
    handleChangeIngredient(idx, { ...item, [key]: value });
  };

  return (
    <Paper className={localClasses.notePaper}>
      <CardHeader
        action={
          <div>
            {recipe.userId._id === loggedInUser._id && (
              <>
                {openEditMode ? (
                  <>
                    <RoundButton
                      type="cancel"
                      handleClick={handleCloseEditMode}
                    />
                    <RoundButton
                      type="done"
                      handleClick={handleSubmitUpdateRecipe}
                    />
                  </>
                ) : (
                  <RoundButton type="edit" handleClick={toggleOpenEditMode} />
                )}
              </>
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
        openEditMode={openEditMode}
        errors={errors?.ingredients}
        initialIngredient={initialIngredient}
      />
      <InstructionCard
        title="Instructions"
        array={instructions}
        handleChange={handleChangeInstruction}
        handleAdd={handleAddInstruction}
        handleDelete={handleDeleteInstruction}
        openEditMode={openEditMode}
        errors={errors?.instructions}
      />
    </Paper>
  );
};

export default RecipeDetailsCard;
