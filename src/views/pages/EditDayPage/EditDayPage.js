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
import { createRecipe } from '../../../redux/actions/recipeActions';

const EditDayPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { dayId } = useParams();
  // selectors
  const { days } = useSelector((state) => state.dayList);
  const { recipes } = useSelector((state) => state.recipeList);
  const { day } = useSelector((state) => state.mealList);
  const { currentUser } = useSelector((state) => state.user);
  const { selectedWeek } = useSelector((state) => state.select);

  // autocompelte
  const filter = createFilterOptions();
  const [open, toggleOpen] = useState(false);

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

  // states
  const [foodFieldsForm, setFoodFieldsForm] = useState([]);
  const dayLength = Object.keys(days).length;
  const [isInEditMealMode, setIsInEditMealMode] = useState(
    new Array(dayLength).fill(false)
  );
  const [newMealName, setNewMealName] = useState('');

  // life cycles
  useEffect(() => {
    dispatch(setMeals(days[dayId]));
  }, []);

  // methods
  const handleSubmit = (event) => {
    event.preventDefault();
    // create new recipe
    dispatch(
      createRecipe({
        recipeName: dialogValue.recipeName,
        userId: currentUser._id,
      })
    );
    handleClose();
  };

  // crud meals
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
    const edits = new Array(dayLength).fill(false);
    setIsInEditMealMode(edits);
    dispatch(updateMeal(mealId, foodFieldsForm, mealIdx));
  };

  // change form
  const handleChangeNewMealName = (event) => {
    setNewMealName(event.target.value);
  };

  const handleEnableEditMealMode = (mealIdx) => {
    const edits = new Array(dayLength).fill(false);
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

  return (
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
                              <IconButton
                                onClick={() =>
                                  handleDeleteFoodFieldForm(recipeIdx)
                                }
                              >
                                <HighlightOffIcon
                                  className={classes.deleteIcon}
                                />
                              </IconButton>
                              <IconButton onClick={handleAddFoodFieldForm}>
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </li>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                  <div className={classes.itemAction}>
                    {isInEditMealMode[mealIdx] ? (
                      <IconButton
                        onClick={() =>
                          handleSubmitUpdateMeal(meal._id, mealIdx)
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

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new recipe</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              value={dialogValue.recipeName}
              onChange={(event) =>
                setDialogValue({
                  recipeName: event.target.value,
                })
              }
              label="Recipe Name"
              type="text"
              variant="standard"
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
};

export default EditDayPage;
