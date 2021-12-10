import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './styles';
import { Paper } from '@material-ui/core';
import CardHeader from '../../common/CardHeader/CardHeader';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import InstructionCard from '../../components/InstructionCard/InstructionCard';
import useArray from '../../../utils/hooks/useArray';
import useEditMode from '../../../utils/hooks/useEditMode';
import useForm from '../../../utils/hooks/useForm';
import { processIngredients } from '../../../utils/forms/ingredients';
import { validateAmount } from '../../../utils/validations/validate';
import { updateRecipe } from '../../../redux/actions/recipeActions';

const RecipeDetails = ({ recipe }) => {
  const localClasses = styles();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.user);
  const { loadingUpdate } = useSelector((state) => state.recipe);

  // instructions
  const {
    array: instructions,
    addAt: handleAddInstruction,
    remove: handleDeleteInstruction,
    update: handleChangeInstruction,
    reset: resetInstructions,
    setArray: setInstructions,
  } = useArray(recipe.instructions.length === 0 ? [''] : recipe.instructions);

  const handleOnDragEnd = (result) => {
    const instructions = [...instructions];
    const [reorderedItem] = instructions.splice(result.source.index, 1);
    instructions.splice(result.destination.index, 0, reorderedItem);
    setInstructions(instructions);
  };

  // ingredients
  const initialIngredient = {
    amount: {
      whole: 0,
      numer: 0,
      denom: 1,
      toString: '0',
    },
    unit: { label: 'none' },
    ingredientName: '',
    calPerUnit: 0,
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

  const handleChangeIngredientEntry = (idx, item, key, value) => {
    handleChangeIngredient(idx, { ...item, [key]: value });
  };

  // edit mode
  const { openEditMode, toggleOpenEditMode, handleCloseEditMode } = useEditMode(
    () => {
      resetIngredients();
      resetInstructions();
    }
  );

  // update recipe
  const { handleSubmit, errors } = useForm({}, () => {
    dispatch(updateRecipe(recipe._id, { ingredients, instructions }));
    toggleOpenEditMode(false);
  });
  const handleSubmitUpdateRecipe = (event) => {
    // validate
    const errors = {};
    // validate ingredients
    ingredients.forEach((item, itemIdx) => {
      const { amount, ingredientName } = item;
      // if the first row is the default row, then skip validation
      if (
        amount.toString.trim() === '' &&
        ingredientName.trim() === '' &&
        itemIdx === 0
      ) {
        return;
      }
      if (
        !amount.toString ||
        amount.toString.trim() === '' ||
        !validateAmount(amount.toString.trim())
      ) {
        errors[`${itemIdx}amount`] = '';
      }
      if (!ingredientName || ingredientName.trim() === '') {
        errors[`${itemIdx}ingredientName`] = '';
      }
    });
    // process
    if (Object.keys(errors).length === 0) {
      processIngredients(ingredients);
    }
    // submit
    handleSubmit(event, errors);
  };

  return (
    <>
      <Paper className={localClasses.notePaper}>
        <CardHeader
          title="Ingredients"
          useEditMode={true}
          useEditCondition={
            loggedInUser && recipe.userId._id === loggedInUser._id
          }
          showEdit={openEditMode}
          handleOpenEdit={toggleOpenEditMode}
          handleCloseEdit={handleCloseEditMode}
          handleDoneEdit={handleSubmitUpdateRecipe}
        />
        <IngredientCard
          ingredients={ingredients}
          openEditMode={openEditMode}
          handleAddIngredient={handleAddIngredient}
          handleChangeIngredientEntry={handleChangeIngredientEntry}
          errors={errors}
          initialIngredient={initialIngredient}
          handleDeleteIngredient={handleDeleteIngredient}
        />
      </Paper>
      <Paper className={localClasses.notePaper}>
        <CardHeader
          title="Instructions"
          useEditMode={true}
          useEditCondition={
            loggedInUser && recipe.userId._id === loggedInUser._id
          }
          showEdit={openEditMode}
          handleOpenEdit={toggleOpenEditMode}
          handleCloseEdit={handleCloseEditMode}
          handleDoneEdit={handleSubmitUpdateRecipe}
        />
        <InstructionCard
          instructions={instructions}
          openEditMode={openEditMode}
          handleOnDragEnd={handleOnDragEnd}
          handleChangeInstruction={handleChangeInstruction}
          handleAddInstruction={handleAddInstruction}
          handleDeleteInstruction={handleDeleteInstruction}
          errors={errors.instructions}
        />
      </Paper>
    </>
  );
};

export default RecipeDetails;
