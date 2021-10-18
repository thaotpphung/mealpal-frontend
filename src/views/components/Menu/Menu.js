import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useStyles from '../../../containers/styles';
import { Paper } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import { getDayListByWeekId } from '../../../redux/actions/dayActions';
import CardHeader from '../../common/CardHeader/CardHeader';
import RoundButton from '../../common/Buttons/RoundButton';

const Menu = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { days } = useSelector((state) => state.dayList);
  const { selectedWeek } = useSelector((state) => state.select);

  useEffect(() => {
    dispatch(getDayListByWeekId(selectedWeek.id));
  }, [selectedWeek.id]);

  return (
    <div>
      {Object.values(days).map((day, dayIdx) => (
        <Paper key={`day-card-${dayIdx}`} className={classes.menuContainer}>
          <CardHeader
            title={day.dayName}
            action={
              <Link to={{ pathname: `/days/${day._id}/edit` }}>
                <RoundButton type="edit" />
              </Link>
            }
          />
          <div className={classes.content}>
            {day.meals.map((meal, mealIdx) => {
              return (
                <div
                  key={`meal-in-day-card-${mealIdx}`}
                  className={classes.menuItem}
                >
                  <div className={classes.itemIcon}>{meal.mealName}</div>
                  <div className={classes.itemContent}>
                    <ul className={classes.menuContent}>
                      {meal.food.map((recipe, recipeIdx) => {
                        return (
                          <li key={`dish-in-meal-${recipeIdx}`}>
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
      ))}
    </div>
  );
};

export default Menu;
