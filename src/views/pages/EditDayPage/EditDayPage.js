import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import useStyles from './styles';
import { IconButton, Paper, TextField, Button } from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import {
  createMeal,
  deleteMeal,
  updateMeal,
  setMeals,
} from '../../../redux/actions/mealActions';

const EditDayPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dayId } = useParams();
  // selectors
  const { days } = useSelector((state) => state.dayList);
  const { recipes } = useSelector((state) => state.recipeList);
  const { day } = useSelector((state) => state.mealList);
  // states
  const dayLength = Object.keys(days).length;
  const [isInEditMealMode, setIsInEditMealMode] = useState(
    new Array(dayLength).fill(false)
  );
  const [newMealName, setNewMealName] = useState('');
  const [foodFields, setFoodFields] = useState([]);
  const [foodFromRecipes, setFoodFromRecipes] = useState([]); // fields with ids that will be sent to backend

  useEffect(() => {
    dispatch(setMeals(days[dayId]));
  }, []);

  // crud meals
  const handleDeleteMeal = (mealId) => {
    dispatch(deleteMeal(mealId, dayId));
  };

  const handleSubmitCreateMeal = () => {
    dispatch(createMeal({ mealName: newMealName, dayId: dayId }));
  };

  const handleSubmitUpdateMeal = (mealId, mealIdx, dayId) => {
    const edits = new Array(dayLength).fill(false);
    setIsInEditMealMode(edits);
    dispatch(updateMeal(mealId, foodFields, mealIdx, dayId, foodFromRecipes));
  };

  // others
  const handleChangeNewMealName = (event) => {
    setNewMealName(event.target.value);
  };

  const handleEnableEditMealMode = (mealIdx) => {
    const edits = new Array(dayLength).fill(false);
    edits[mealIdx] = true;
    setIsInEditMealMode(edits);
    setFoodFields(['']);
    setFoodFromRecipes([]);
  };

  // food fields
  const handleChangeFoodField = (event, recipeIdx) => {
    const fields = [...foodFields];
    fields[recipeIdx] = event.target.value;
    setFoodFields(fields);
  };

  const handleAddFoodField = () => {
    const fields = [...foodFields];
    fields.push('');
    setFoodFields(fields);
  };

  const handleDeleteFoodField = (recipeIdx) => {
    const fields = [...foodFields];
    fields.splice(recipeIdx, 1);
    setFoodFields(fields);
  };

  // food from recipes
  const extractedFieldsForAutoComplete = Object.values(recipes).map(
    (recipe) => {
      return {
        label: recipe.recipeName,
        recipeId: recipe._id,
      };
    }
  );

  const handleAddFoodFromRecipes = (value) => {
    const recipes = [...foodFromRecipes];
    recipes.push(value);
    setFoodFromRecipes(recipes);
  };

  const handleDeleteFoodFromRecipes = (recipeIdx) => {
    const recipes = [...foodFromRecipes];
    recipes.splice(recipeIdx, 1);
    setFoodFromRecipes(recipes);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <div>{day.dayName}</div>
      </div>
      <div className={classes.content}>
        {day.meals !== undefined &&
          day.meals.map((meal, mealIdx) => {
            return (
              <div key={`meal-in-day-card-${mealIdx}`} className={classes.item}>
                <div className={classes.itemIcon}>{meal.mealName}</div>
                <div className={classes.itemContent}>
                  <ul className={classes.menu}>
                    {meal.food.map((recipe) => {
                      return (
                        <li key={recipe._id}>
                          <RestaurantMenuIcon />
                          {recipe.recipeName}
                        </li>
                      );
                    })}
                    {foodFields.map((recipe, recipeIdx) => {
                      return (
                        isInEditMealMode[mealIdx] && (
                          <li key={`food-field-${recipeIdx}`}>
                            <RestaurantMenuIcon />
                            <TextField
                              variant="outlined"
                              value={recipe}
                              onChange={(event) =>
                                handleChangeFoodField(event, recipeIdx)
                              }
                            />
                            <IconButton
                              onClick={() => handleDeleteFoodField(recipeIdx)}
                            >
                              <HighlightOffIcon
                                className={classes.deleteIcon}
                              />
                            </IconButton>
                            <IconButton onClick={handleAddFoodField}>
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </li>
                        )
                      );
                    })}
                    {isInEditMealMode[mealIdx] && (
                      <>
                        {foodFromRecipes.map((recipe, recipeIdx) => {
                          return (
                            <li
                              key={`recipe-food-${recipe.recipeId}-${recipeIdx}`}
                            >
                              <RestaurantMenuIcon />
                              {recipe.label}
                              <IconButton
                                onClick={() =>
                                  handleDeleteFoodFromRecipes(recipeIdx)
                                }
                              >
                                <HighlightOffIcon
                                  className={classes.deleteIcon}
                                />
                              </IconButton>
                            </li>
                          );
                        })}
                        <Autocomplete
                          onChange={(event, value) =>
                            handleAddFoodFromRecipes(value)
                          }
                          disablePortal
                          getOptionLabel={(option) => option.label}
                          options={extractedFieldsForAutoComplete}
                          sx={{ width: 300 }}
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              {...props}
                              key={option.recipeId}
                            >
                              {option.label}
                            </Box>
                          )}
                          renderInput={(params) => (
                            <TextField {...params} label="Add from recipes" />
                          )}
                        />
                      </>
                    )}
                  </ul>
                </div>
                <div className={classes.itemAction}>
                  {isInEditMealMode[mealIdx] ? (
                    <IconButton
                      onClick={() =>
                        handleSubmitUpdateMeal(meal._id, mealIdx, dayId)
                      }
                    >
                      <DoneIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleEnableEditMealMode(mealIdx)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleDeleteMeal(meal._id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            );
          })}
        <div>
          <TextField
            variant="outlined"
            value={newMealName}
            onChange={handleChangeNewMealName}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSubmitCreateMeal}
          >
            + Add Meal
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default EditDayPage;
