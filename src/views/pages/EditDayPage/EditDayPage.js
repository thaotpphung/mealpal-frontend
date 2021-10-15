import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import { IconButton, Paper, TextField, Button } from '@material-ui/core';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import {
  createMeal,
  deleteMeal,
  updateMeal,
  setMeals,
  getMeals,
} from '../../../redux/actions/mealActions';
import { createRecipe } from '../../../redux/actions/recipeActions';
import Input from '../../common/Input/Input';
import Spinner from '../../common/Spinner/Spinner';
import useArray from '../../../utils/hooks/useArray';
import RoundButton from '../../common/Buttons/RoundButton';
import AutocompleteField from '../../common/AutocompleteField/AutocompleteField';

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

  const filter = createFilterOptions();
  const [open, toggleOpen] = useState(false);

  useEffect(() => {
    console.log(days[dayId]);
    dispatch(getMeals(dayId));
  }, []);

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  // dialog
  const handleClose = () => {
    setDialogValue({
      recipeName: '',
    });
    toggleOpen(false);
  };
  const [dialogValue, setDialogValue] = useState({
    recipeName: '',
  });

  const [foodFieldsForm, setFoodFieldsForm] = useState([]);

  const [newMealName, setNewMealName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createRecipe({
        recipeName: dialogValue.recipeName,
        userId: currentUser._id,
      })
    );
    handleClose();
  };

  const handleDeleteMeal = (mealId) => {
    dispatch(deleteMeal(mealId));
  };

  const handleSubmitCreateMeal = () => {
    dispatch(
      createMeal({
        mealName: newMealName,
        dayId: dayId,
        weekId: selectedWeek.id,
      })
    );
  };

  const handleSubmitUpdateMeal = (mealId, mealIdx) => {
    const edits = new Array(day.meals.length).fill(false);
    setIsInEditMealMode(edits);
    dispatch(updateMeal(mealId, foodFieldsForm, mealIdx));
  };

  // change form
  const handleChangeNewMealName = (event) => {
    setNewMealName(event.target.value);
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

  // food from recipes
  const extractedFieldsForAutoComplete = Object.values(recipes).map(
    (recipe) => {
      return {
        recipeName: recipe.recipeName,
        _id: recipe._id,
      };
    }
  );

  // food fields form
  const handleChangeFoodFieldForm = (value, recipeIdx) => {
    if (value !== null) {
      const fields = [...foodFieldsForm];
      fields[recipeIdx] = { ...recipes[value._id], ...value };
      setFoodFieldsForm(fields);
    }
  };

  const handleDeleteFoodFieldForm = (recipeIdx) => {
    const fields = [...foodFieldsForm];
    fields.splice(recipeIdx, 1);
    setFoodFieldsForm(fields);
  };

  const handleAddFoodFieldForm = () => {
    const fields = [...foodFieldsForm];
    fields.push({
      recipeName: '',
      _id: '',
    });
    setFoodFieldsForm(fields);
  };

  const handleChangeDialogValue = (event) => {
    setDialogValue({
      recipeName: event.target.value,
    });
  };

  const Component = (
    <>
      <Paper className={classes.root}>
        <div className={classes.header}>
          <div>{day.dayName}</div>
        </div>
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

                              <AutocompleteField />
                              <Autocomplete
                                value={foodFieldsForm[recipeIdx]}
                                onChange={(event, newValue) => {
                                  if (typeof newValue === 'string') {
                                    setTimeout(() => {
                                      toggleOpen(true);
                                      setDialogValue({
                                        recipeName: newValue,
                                      });
                                    });
                                  } else if (newValue && newValue.inputValue) {
                                    toggleOpen(true);
                                    setDialogValue({
                                      recipeName: newValue.inputValue,
                                    });
                                  } else {
                                    handleChangeFoodFieldForm(
                                      newValue,
                                      recipeIdx
                                    );
                                  }
                                }}
                                filterOptions={(options, params) => {
                                  const filtered = filter(options, params);
                                  if (params.inputValue !== '') {
                                    filtered.push({
                                      inputValue: params.inputValue,
                                      recipeName: `Add "${params.inputValue}"`,
                                    });
                                  }
                                  return filtered;
                                }}
                                options={extractedFieldsForAutoComplete}
                                getOptionLabel={(option) => {
                                  // e.g value selected with enter, right from the input
                                  if (typeof option === 'string') {
                                    return option;
                                  }
                                  if (option.inputValue) {
                                    return option.inputValue;
                                  }
                                  return option.recipeName;
                                }}
                                selectOnFocus
                                clearOnBlur
                                handleHomeEndKeys
                                renderOption={(props, option) => (
                                  <li
                                    {...props}
                                    key={`food-field-item-${option._id}-${recipeIdx}`}
                                  >
                                    {option.recipeName}
                                  </li>
                                )}
                                sx={{ width: 300 }}
                                freeSolo
                                renderInput={(params) => (
                                  <TextField {...params} label="" />
                                )}
                              />
                              <RoundButton
                                type="deleteField"
                                handleClick={() =>
                                  handleDeleteFoodFieldForm(recipeIdx)
                                }
                              />
                              <RoundButton
                                type="addField"
                                handleClick={handleAddFoodFieldForm}
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

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new recipe</DialogTitle>
          <DialogContent>
            <Input
              name="recipeName"
              label="Recipe Name"
              handleChange={handleChangeDialogValue}
              value={dialogValue.recipeName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
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
