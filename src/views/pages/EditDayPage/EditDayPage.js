import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useStyles from "./styles";
import {
  Backdrop,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
  TextField,
} from "@material-ui/core";
import Menu from "../../components/Menu/Menu";
import {
  plans,
  currentPlan,
  weeks,
  currentWeek,
  currentWeekDetails,
} from "../../../constants/data";
import EditIcon from "@material-ui/icons/Edit";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import { createPlan } from "../../../redux/actions/planActions";
import Spinner from "../../common/Spinner/Spinner";

const EditDayPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [meals, setMeals] = useState([
    {
      mealName: "Breakfast",
      food: [""],
    },
    {
      mealName: "Lunch",
      food: [""],
    },
    {
      mealName: "Dinner",
      food: [""],
    },
  ]);

  const handleAddRecipe = (e, mealIdx) => {
    const updatedFood = [...meals[mealIdx].food, ""];

    const updatedMeals = [
      ...JSON.parse(JSON.stringify(meals)).slice(0, mealIdx),
      {
        mealName: meals[mealIdx].mealName,
        food: updatedFood,
      },
      ...JSON.parse(JSON.stringify(meals)).slice(mealIdx + 1),
    ];
    setMeals(updatedMeals);
  };

  const handleChangeRecipe = (e, mealIdx, recipeIdx) => {
    const updatedFood = [
      ...meals[mealIdx].food.slice(0, recipeIdx),
      e.target.value,
      ...meals[mealIdx].food.slice(recipeIdx + 1),
    ];

    const updatedMeals = [
      ...JSON.parse(JSON.stringify(meals)).slice(0, mealIdx),
      {
        mealName: meals[mealIdx].mealName,
        food: updatedFood,
      },
      ...JSON.parse(JSON.stringify(meals)).slice(mealIdx + 1),
    ];
    setMeals(updatedMeals);
  };

  const handleDeleteRecipe = (e, mealIdx, recipeIdx) => {
    const updatedFood = [...meals[mealIdx].food];
    updatedFood.splice(recipeIdx, 1);
    const updatedMeals = [
      ...JSON.parse(JSON.stringify(meals)).slice(0, mealIdx),
      {
        mealName: meals[mealIdx].mealName,
        food: updatedFood,
      },
      ...JSON.parse(JSON.stringify(meals)).slice(mealIdx + 1),
    ];
    setMeals(updatedMeals);
  };

  const handleSubmit = (e) => {
    // dispatch(updateDay())
  }

  return (
    <div>
      <Typography variant="h3">Edit Day Form</Typography>
      {meals.map((meal, mealIdx) => (
        <div key={`meal-field=${mealIdx}`} className={classes.row}>
          <Typography>{meal.mealName} </Typography>
          {meal.food.map((recipe, recipeIdx) => (
            <div key={`recipe-field-${recipeIdx}`} className={classes.field}>
              <TextField
                variant="outlined"
                name="recipeField"
                value={recipe}
                onChange={(e) => handleChangeRecipe(e, mealIdx, recipeIdx)}
              />
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
                onClick={(e) => handleDeleteRecipe(e, mealIdx, recipeIdx)}
              >
                - Remove Dish
              </Button>
            </div>
          ))}

          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={(e) => handleAddRecipe(e, mealIdx)}
          >
            + Add Another
          </Button>
        </div>
      ))}

      <Button 
        variant="contained" 
        color="primary" 
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
};

export default EditDayPage;
