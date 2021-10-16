import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import { Paper, Grid } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import {
  createMeal,
  deleteMeal,
  updateMeal,
  setMeals,
} from '../../../redux/actions/mealActions';
import { createRecipe } from '../../../redux/actions/recipeActions';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import useArray from '../../../utils/hooks/useArray';
import useForm from '../../../utils/hooks/useForm';
import useDialog from '../../../utils/hooks/useDialog';
import RoundButton from '../../common/Buttons/RoundButton';
import CardHeader from '../../common/CardHeader/CardHeader';
import AutocompleteField from '../../common/AutocompleteField/AutocompleteField';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import { getAllRecipes } from '../../../redux/actions/recipeActions';

const EditDayPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dayId } = useParams();
  // selectors
  const { days } = useSelector((state) => state.dayList);
  const { recipes } = useSelector((state) => state.recipeList);
  const { day, loading, error } = useSelector((state) => state.mealList);
  const { currentUser } = useSelector((state) => state.user);
  const { selectedWeek } = useSelector((state) => state.select);
  const [isInEditMealMode, setIsInEditMealMode] = useState([]);

  useEffect(() => {
    dispatch(setMeals(days[dayId]));
  }, []);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  // new recipe dialog form
  const {
    open: openNewRecipeDialog,
    toggleOpen: toggleOpenNewRecipeDialog,
    handleClose: handleCloseNewRecipeDialog,
  } = useDialog(() => resetNewRecipeName());
  const {
    handleChange: handleChangeRecipeName,
    handleSubmit: handleSubmitCreateRecipe,
    values: newRecipeName,
    setValue: setNewRecipeName,
    reset: resetNewRecipeName,
  } = useForm(
    {
      recipeName: '',
    },
    () => {
      dispatch(
        createRecipe({
          ...newRecipeName,
          userId: currentUser._id,
        })
      );
      handleCloseNewRecipeDialog();
    }
  );

  // new recipe dialog form
  const {
    open: openNewMealDialog,
    toggleOpen: toggleOpenNewMealDialog,
    handleClose: handleCloseNewMealDialog,
  } = useDialog(() => resetNewMealName());
  const {
    handleChange: handleChangeNewMealName,
    handleSubmit: handleSubmitCreateMeal,
    values: newMealName,
    reset: resetNewMealName,
  } = useForm({ mealName: '' }, () => {
    dispatch(
      createMeal({
        ...newMealName,
        dayId: dayId,
        weekId: selectedWeek.id,
      })
    );
    handleCloseNewMealDialog();
  });

  // food fields form
  const {
    array: foodFieldsForm,
    update: handleChangeFoodFieldForm,
    push: handleAddFoodFieldForm,
    remove: handleDeleteFoodFieldForm,
    set: setFoodFieldsForm,
  } = useArray([]);

  // delete meal
  const handleDeleteMeal = (mealId) => {
    dispatch(deleteMeal(mealId));
  };

  // update meal
  const handleSubmitUpdateMeal = (mealId, mealIdx) => {
    const edits = new Array(day.meals.length).fill(false);
    setIsInEditMealMode(edits);
    dispatch(updateMeal(mealId, foodFieldsForm, mealIdx));
  };

  const handleEnableEditMealMode = (mealIdx) => {
    const edits = new Array(day.meals.length).fill(false);
    edits[mealIdx] = true;
    setIsInEditMealMode(edits);
    if (day.meals[mealIdx].food.length === 0) {
      setFoodFieldsForm([
        {
          recipeName: '',
          _id: '',
        },
      ]);
    } else {
      setFoodFieldsForm(day.meals[mealIdx].food);
    }
  };

  // transform recipes for autocomplete
  const extractedFieldsForAutoComplete = Object.values(recipes).map(
    (recipe) => {
      return {
        recipeName: recipe.recipeName,
        _id: recipe._id,
      };
    }
  );

  const Component = (
    <>
      <PopupDialog
        title="Add a new recipe"
        content={
          <div className={classes.formPaper}>
            <form className={classes.formContainer}>
              <Grid spacing={2}>
                <Input
                  name="recipeName"
                  label="Recipe Name"
                  handleChange={handleChangeRecipeName}
                  value={newRecipeName.recipeName}
                />
              </Grid>
            </form>
          </div>
        }
        handleSubmit={handleSubmitCreateRecipe}
        open={openNewRecipeDialog}
        handleClose={handleCloseNewRecipeDialog}
      />
      <PopupDialog
        title="Add a new meal"
        content={
          <Input
            half
            name="mealName"
            value={newMealName.mealName}
            handleChange={handleChangeNewMealName}
          />
        }
        handleSubmit={handleSubmitCreateMeal}
        open={openNewMealDialog}
        handleClose={handleCloseNewMealDialog}
      />
      <Paper className={classes.root}>
        <CardHeader
          title={day.dayName}
          action={
            <RoundButton type="add" handleClick={toggleOpenNewMealDialog} />
          }
        />
        <div className={classes.content}>
          {day.meals !== undefined &&
            day.meals.map((meal, mealIdx) => {
              return (
                <div
                  key={`meal-in-day-card-${mealIdx}`}
                  className={classes.item}
                >
                  <div className={classes.itemIcon}>{meal.mealName}</div>
                  <div className={classes.itemContent}>
                    <ul className={classes.menu}>
                      {!isInEditMealMode[mealIdx] && (
                        <>
                          {meal.food.map((recipe, recipeIdx) => (
                            <li
                              key={`official-food-${recipe._id}-${recipeIdx}`}
                            >
                              <RestaurantMenuIcon />
                              {recipe.recipeName}
                            </li>
                          ))}
                        </>
                      )}
                      {isInEditMealMode[mealIdx] && (
                        <>
                          {foodFieldsForm.map((recipe, recipeIdx) => (
                            <li key={`food-field-${recipe._id}-${recipeIdx}`}>
                              <RestaurantMenuIcon />
                              <AutocompleteField
                                value={foodFieldsForm[recipeIdx]}
                                toggleOpen={toggleOpenNewRecipeDialog}
                                setDialogValue={setNewRecipeName}
                                handleChangeAutocompleteField={
                                  handleChangeFoodFieldForm
                                }
                                param="recipeName"
                                options={extractedFieldsForAutoComplete}
                                changedIndex={recipeIdx}
                              />
                              <RoundButton
                                type="deleteField"
                                handleClick={() =>
                                  handleDeleteFoodFieldForm(recipeIdx)
                                }
                              />
                              <RoundButton
                                type="addField"
                                handleClick={() =>
                                  handleAddFoodFieldForm({
                                    recipeName: '',
                                    _id: '',
                                  })
                                }
                              />
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                  <div className={classes.itemAction}>
                    {isInEditMealMode[mealIdx] ? (
                      <RoundButton
                        type="done"
                        handleClick={() =>
                          handleSubmitUpdateMeal(meal._id, mealIdx)
                        }
                      />
                    ) : (
                      <RoundButton
                        type="edit"
                        handleClick={() => handleEnableEditMealMode(mealIdx)}
                      />
                    )}
                    <RoundButton
                      type="delete"
                      handleClick={() => handleDeleteMeal(meal._id)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </Paper>
    </>
  );

  if (!loading && Object.keys(day).length > 0) {
    return Component;
  } else if (error) {
    return <div>{error}</div>;
  }
  return <Spinner />;
};

export default EditDayPage;
