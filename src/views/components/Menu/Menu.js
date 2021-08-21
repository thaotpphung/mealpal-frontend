import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { IconButton, Paper} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";

const Menu = ({week}) => {
  const classes = useStyles();
  
  const handleClickEditMeal = (e) => {
    console.log("click edit meal");
  };

  return (
    <div>
      {week.days.map((day, dayIdx) => {
        return (
          <Paper className={classes.root}>
            <div className={classes.header}>
              <div>{day.dayName}</div>
              <IconButton className={classes.action}>
                <EditIcon onClick={handleClickEditMeal} />
              </IconButton>
            </div>
            <div className={classes.content}>
              {day.meals.map((meal, mealIdx) => {
                return (
                  <div className={classes.menuMeal}>
                    <div className={classes.menuMealTitle}>{meal.mealName}</div>
                    <div className={classes.menuMealContent}>
                      <ul className={classes.menu}>
                        {meal.food.map((recipe, recipeIdx) => {
                          return (
                            <li>
                              <RestaurantMenuIcon />
                              <span>{recipe.recipeName}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </Paper>
        );
      })}
    </div>
  );
};

export default Menu;
