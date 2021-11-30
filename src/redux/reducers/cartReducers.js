import {
  CART_ADD_BY_RECIPE,
  CART_ADD_BY_WEEK,
  CART_ADD_BY_DAY,
  CART_ADD_BY_MEAL,
  CART_UPDATE,
  CART_CLEAR,
} from '../constants/cartConstants';
import { addMixedNumber } from '../../utils/mixedNumber';
import cloneDeep from 'lodash/cloneDeep';

const INITIAL_STATE = {
  cart: [],
};

const addOne = (recipe, cart) => {
  recipe?.ingredients.forEach((ingredient) => {
    if (ingredient.amount.toString !== '') {
      // initialize food
      cart[ingredient.ingredientName] = cart[ingredient.ingredientName]
        ? cart[ingredient.ingredientName]
        : { units: {}, recipes: {}, checked: false, showDetails: false };
      // initialize unit
      if (!(ingredient.unit.label in cart[ingredient.ingredientName].units)) {
        cart[ingredient.ingredientName].units[ingredient.unit.label] = {};
      }
      // compute
      let current =
        cart[ingredient.ingredientName].units[ingredient.unit.label];
      if (Object.keys(current).length === 0)
        current = { whole: 0, numer: 0, denom: 1 };
      const result = addMixedNumber(current, ingredient.amount);
      cart[ingredient.ingredientName].units[ingredient.unit.label] = result;
      cart[ingredient.ingredientName].recipes[recipe.recipeName] =
        recipe.recipeName;
    }
  });
  return cart;
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_BY_RECIPE: {
      const recipe = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      addOne(recipe, updatedCart);
      return {
        cart: updatedCart,
      };
    }
    case CART_ADD_BY_WEEK: {
      const week = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      week.days.forEach((day) => {
        day.meals.forEach((meal) => {
          meal.food.forEach((recipe) => {
            addOne(recipe, updatedCart);
          });
        });
      });
      return {
        cart: updatedCart,
      };
    }

    case CART_ADD_BY_DAY: {
      const day = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      day.meals.forEach((meal) => {
        meal.food.forEach((recipe) => {
          addOne(recipe, updatedCart);
        });
      });
      return {
        cart: updatedCart,
      };
    }

    case CART_ADD_BY_MEAL: {
      const meal = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      meal.food.forEach((recipe) => {
        addOne(recipe, updatedCart);
      });
      return {
        cart: updatedCart,
      };
    }

    case CART_UPDATE: {
      return {
        cart: action.payload,
      };
    }

    case CART_CLEAR:
      return { cart: {} };

    default:
      return state;
  }
};

export default cartReducer;
