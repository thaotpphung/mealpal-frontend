import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';
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
import { simplifyMixedNumber } from '../../../utils/mixedNumber';
import { updateRecipe } from '../../../redux/actions/recipeActions';
import { addAlertWithTimeout } from '../../../redux/actions/alertActions';

const RecipeDetailsCard = ({ recipe }) => {
  const classes = useStyles();
  const localClasses = styles();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);
  const initialIngredient = {
    amount: {
      whole: 0,
      numer: 0,
      denom: 1,
    },
    unit: { label: '' },
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
  const { handleSubmit, errors, setError } = useForm({}, () => {
    dispatch(updateRecipe(recipe._id, { ingredients, instructions }));
    toggleOpenEditMode(false);
  });

  const handleSubmitUpdateRecipe = (event) => {
    const errors = {};
    validateArray('ingredients', ingredients, errors, (item) => {
      return (
        !String(item.amount.whole) ||
        !String(item.amount.numer) ||
        !String(item.amount.denom) ||
        item.amount.denom == 0 ||
        !item.unit.label ||
        !item.food ||
        item.food.trim() === ''
      );
    });
    if (!errors) {
      ingredients.forEach((ingredient, idx) => {
        ingredients[idx].amount = simplifyMixedNumber(ingredient.amount);
      });
    }
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
            {loggedInUser && recipe.userId._id === loggedInUser._id && (
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
        setError={setError}
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
