import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import useStyles from '../../../app/styles';
import { styles } from './styles';
import { Paper, Typography, Grid, Button } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import CardHeader from '../../common/CardHeader/CardHeader';
import CardBody from '../../common/CardBody/CardBody';
import InputWithTooltip from '../../common/InputWithTooltip/InputWithTooltip';
import RoundButton from '../../common/Buttons/RoundButton';
import useForm from '../../../utils/hooks/useForm';
import useEditMode from '../../../utils/hooks/useEditMode';
import AutocompleteField from '../../common/AutocompleteField/AutocompleteField';
import PopupDialog from '../../common/PopupDialog/PopupDialog';
import Input from '../../common/Input/Input';
import { createRecipe } from '../../../redux/actions/recipeActions';
import { updateWeekByDay } from '../../../redux/actions/weekActions';
import {
  addToCartByDay,
  addToCartByMeal,
} from '../../../redux/actions/cartActions';
import cloneDeep from 'lodash/cloneDeep';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { validate } from '../../../utils/validations/validate';
import unitOptions from '../../../constants/units';
import { processIngredients } from '../../../utils/forms/ingredients';
import { convertMixedToNum } from '../../../utils/mixedNumber';

const DayCard = ({
  day,
  dayIdx,
  userId,
  handleCancelEditDayMode,
  handleSubmitUpdateDay,
  isInEditDayMode,
  handleEnableEditDayMode,
  dayForm,
  daysWithCalories,
  handleOnDragEnd,
  errors,
  handleChangeMeal,
  handleAddRecipe,
  toggleOpenNewRecipeDialog,
  setNewRecipeParams,
  setNewRecipe,
  extractedFieldsForAutoComplete,
  handleChangeRecipe,
}) => {
  const classes = useStyles();
  const { weekId } = useParams();
  const dispatch = useDispatch();
  const localClasses = styles();
  const { loggedInUser } = useSelector((state) => state.user);

  return (
    <Paper key={`day-card-${day._id}-${dayIdx}`}>
      <CardHeader
        title={`${day.name}`}
        action={
          <>
            {!!loggedInUser && loggedInUser._id === userId._id && (
              <>
                {!!weekId && (
                  <>
                    {isInEditDayMode[dayIdx] ? (
                      <>
                        <RoundButton
                          type="cancel"
                          handleClick={() => handleCancelEditDayMode(dayIdx)}
                        />
                        <RoundButton
                          type="done"
                          handleClick={(event) =>
                            handleSubmitUpdateDay(event, dayIdx)
                          }
                        />
                      </>
                    ) : (
                      <>
                        <RoundButton
                          type={isInEditDayMode[dayIdx] ? 'cancel' : 'edit'}
                          handleClick={() => handleEnableEditDayMode(dayIdx)}
                        />
                        <RoundButton
                          type="shoppingCart"
                          handleClick={() =>
                            dispatch(
                              addToCartByDay(daysWithCalories[dayIdx], history)
                            )
                          }
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        }
      />
      <CardBody>
        {!isInEditDayMode[dayIdx] && (
          <>
            {day.meals.map((meal, mealIdx) => {
              return (
                <Grid
                  container
                  spacing={2}
                  alignItems="stretch"
                  key={`meal-in-day-card-${meal._id}-${dayIdx}-${mealIdx}}`}
                >
                  <Grid item xs={4} sm={2}>
                    <Typography>
                      <strong>{meal.name}</strong>
                    </Typography>
                    <Typography>{meal.calories.toFixed(2)} kCal</Typography>
                  </Grid>
                  <Grid item xs={6} sm={8}>
                    <ul className={localClasses.menuContent}>
                      {!isInEditDayMode[dayIdx] && (
                        <>
                          {meal.recipes.map((recipe, recipeIdx) => {
                            return (
                              <li
                                key={`recipe-in-meal-${recipe._id}-${recipeIdx})}`}
                              >
                                <RestaurantMenuIcon
                                  className={classes.foodIcon}
                                />
                                <Link
                                  to={{
                                    pathname: `/recipes/${recipe._id}`,
                                  }}
                                >
                                  <Typography>{recipe.name}</Typography>
                                </Link>
                              </li>
                            );
                          })}
                          {meal.food.map((ingredient, ingredientIdx) => {
                            return (
                              <li
                                key={`ingredient-in-meal-${ingredient._id}-${ingredientIdx})}`}
                              >
                                <FastfoodIcon className={classes.foodIcon} />
                                <Typography>
                                  {ingredient.amount.toString}
                                  {'\u00A0'}
                                  {ingredient.unit.label !== 'none' &&
                                    ingredient.unit.label}
                                  {'\u00A0'}
                                  <strong>{ingredient.ingredientName}</strong>
                                </Typography>
                              </li>
                            );
                          })}
                        </>
                      )}
                    </ul>
                  </Grid>
                  {!!loggedInUser && loggedInUser._id === userId._id && (
                    <Grid item xs={2} sm={2} className={localClasses.rowAction}>
                      <RoundButton
                        type="shoppingCart"
                        handleClick={() => {
                          dispatch(
                            addToCartByMeal(
                              daysWithCalories[dayIdx].meals[mealIdx],
                              history
                            )
                          );
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              );
            })}
            <Typography className={localClasses.total}>
              <strong>Total:</strong> {day.calories.toFixed(2)} kCal
            </Typography>
          </>
        )}
        {isInEditDayMode[dayIdx] && dayForm !== undefined && (
          <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="meals">
                {(provided) => (
                  <ul {...provided.droppableProps} ref={provided.innerRef}>
                    {dayForm.meals.map((meal, mealIdx) => {
                      return (
                        <Draggable
                          key={`meal-in-field-${meal._id}-${mealIdx}`}
                          draggableId={`meal-in-field-${meal._id}-${mealIdx}`}
                          index={mealIdx}
                        >
                          {(provided) => (
                            <Grid
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              container
                              spacing={2}
                            >
                              <Grid item xs={12} sm={2}>
                                <Input
                                  value={meal.name}
                                  handleChange={(e) =>
                                    handleChangeMeal(e, mealIdx)
                                  }
                                  error={errors[`meal${mealIdx}`]}
                                  required
                                />
                                <Typography>
                                  {meal.calories.toFixed(2)} kCal
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={8}>
                                {meal.recipes.length === 0 && (
                                  <div className={localClasses.addButton}>
                                    <RestaurantMenuIcon />
                                    <Button
                                      color="primary"
                                      variant="contained"
                                      onClick={() =>
                                        handleAddRecipe(mealIdx, 0)
                                      }
                                    >
                                      Add Recipe
                                    </Button>
                                  </div>
                                )}
                                <ul className={localClasses.menuContent}>
                                  {meal.recipes.map((recipe, recipeIdx) => (
                                    <li
                                      key={`recipe-field-${recipe._id}-${recipeIdx}`}
                                    >
                                      <RestaurantMenuIcon
                                        className={localClasses.foodIcon}
                                      />
                                      <Grid container>
                                        <Grid item xs={10}>
                                          <AutocompleteField
                                            label="Recipes"
                                            value={recipe}
                                            toggleOpen={() => {
                                              toggleOpenNewRecipeDialog();
                                              setNewRecipeParams([
                                                mealIdx,
                                                recipeIdx,
                                              ]);
                                            }}
                                            setDialogValue={setNewRecipe}
                                            handleChangeAutocompleteField={
                                              handleChangeRecipe
                                            }
                                            param="name"
                                            options={
                                              extractedFieldsForAutoComplete
                                            }
                                            changedParams={[mealIdx, recipeIdx]}
                                            error={
                                              errors[
                                                `meal${mealIdx}recipes${recipeIdx}`
                                              ]
                                            }
                                            required
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          xs={2}
                                          className={localClasses.fieldAction}
                                        >
                                          <RoundButton
                                            type="addField"
                                            handleClick={() =>
                                              handleAddRecipe(
                                                mealIdx,
                                                recipeIdx
                                              )
                                            }
                                          />
                                          <RoundButton
                                            type="deleteField"
                                            handleClick={() =>
                                              handleDeleteRecipe(
                                                mealIdx,
                                                recipeIdx,
                                                recipe
                                              )
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    </li>
                                  ))}
                                  {meal.food.length === 0 && (
                                    <div className={localClasses.addButton}>
                                      <FastfoodIcon />
                                      <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={() =>
                                          handleAddFood(mealIdx, 0)
                                        }
                                      >
                                        Add Food
                                      </Button>
                                    </div>
                                  )}
                                  {meal.food.map((item, itemIdx) => (
                                    <li key={`food-field-${itemIdx}`}>
                                      <FastfoodIcon
                                        className={localClasses.foodIcon}
                                      />
                                      <Grid container>
                                        <Grid item xs={10}>
                                          <Grid
                                            container
                                            spacing={1}
                                            alignItems="center"
                                          >
                                            <Grid item xs={8} md={6} lg={3}>
                                              <InputWithTooltip
                                                label="Amt"
                                                tooltip="Number (Ex: 1) or Number Fraction (ex: 1 1/2)"
                                                value={item.amount.toString}
                                                handleChange={(event) => {
                                                  handleChangeIngredientEntry(
                                                    mealIdx,
                                                    itemIdx,
                                                    item,
                                                    'amount',
                                                    {
                                                      ...item.amount,
                                                      ['toString']:
                                                        event.target.value,
                                                    }
                                                  );
                                                }}
                                                error={
                                                  errors[
                                                    `meal${mealIdx}food${itemIdx}amount`
                                                  ]
                                                }
                                              />
                                            </Grid>
                                            <Grid item xs={4} md={6} lg={3}>
                                              <AutocompleteField
                                                label="Unit"
                                                value={item.unit.label}
                                                toggleOpen={() => {
                                                  toggleOpenNewUnitDialog();
                                                  setNewUnitParams([
                                                    mealIdx,
                                                    itemIdx,
                                                    item,
                                                    'unit',
                                                  ]);
                                                }}
                                                setDialogValue={setNewUnit}
                                                handleChangeAutocompleteField={
                                                  handleChangeIngredientEntry
                                                }
                                                param="label"
                                                options={unitOptions}
                                                changedParams={[
                                                  mealIdx,
                                                  itemIdx,
                                                  item,
                                                  'unit',
                                                ]}
                                              />
                                            </Grid>
                                            <Grid item xs={8} md={6} lg={3}>
                                              <Input
                                                label="Food"
                                                required
                                                value={item.ingredientName}
                                                handleChange={(event) =>
                                                  handleChangeIngredientEntry(
                                                    mealIdx,
                                                    itemIdx,
                                                    item,
                                                    'ingredientName',
                                                    event.target.value
                                                  )
                                                }
                                                error={
                                                  errors[
                                                    `meal${mealIdx}food${itemIdx}ingredientName`
                                                  ]
                                                }
                                              />
                                            </Grid>
                                            <Grid item xs={4} md={6} lg={3}>
                                              <Input
                                                label="kCal/Unit"
                                                type="number"
                                                value={item.calPerUnit}
                                                handleChange={(event) =>
                                                  handleChangeIngredientEntry(
                                                    mealIdx,
                                                    itemIdx,
                                                    item,
                                                    'calPerUnit',
                                                    event.target.value
                                                  )
                                                }
                                                error={
                                                  errors[
                                                    `meal${mealIdx}food${itemIdx}calPerUnit`
                                                  ]
                                                }
                                              />
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={2}
                                          className={localClasses.fieldAction}
                                        >
                                          <RoundButton
                                            type="addField"
                                            handleClick={() =>
                                              handleAddFood(mealIdx, itemIdx)
                                            }
                                          />
                                          <RoundButton
                                            type="deleteField"
                                            handleClick={() =>
                                              handleDeleteFood(
                                                mealIdx,
                                                itemIdx,
                                                item
                                              )
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                    </li>
                                  ))}
                                </ul>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={2}
                                className={localClasses.rowAction}
                              >
                                <RoundButton
                                  type="add"
                                  handleClick={() => handleAddMeal(mealIdx)}
                                />
                                <RoundButton
                                  type="delete"
                                  handleClick={() => handleDeleteMeal(mealIdx)}
                                />
                              </Grid>
                            </Grid>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
            <Typography className={localClasses.total}>
              <strong>Total:</strong> {dayForm.calories} kCal
            </Typography>
          </>
        )}
      </CardBody>
    </Paper>
  );
};

export default DayCard;
