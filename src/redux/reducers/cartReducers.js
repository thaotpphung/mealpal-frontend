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
  cart: {},
};

const addOne = (recipe, cart) => {
  recipe.ingredients.forEach((ingredient) => {
    if (ingredient.unit.label !== '') {
      // initialize food
      cart[ingredient.food] = cart[ingredient.food]
        ? cart[ingredient.food]
        : { units: {}, recipes: {} };
      console.log('after initialize cart', cart[ingredient.food]);
      // initialize unit
      if (!(ingredient.unit.label in cart[ingredient.food].units)) {
        cart[ingredient.food].units[ingredient.unit.label] = {};
      }
      // compute
      let current = cart[ingredient.food].units[ingredient.unit.label];
      if (Object.keys(current).length === 0)
        current = { whole: 0, numer: 0, denom: 1 };
      const result = addMixedNumber(current, ingredient.amount);
      cart[ingredient.food].units[ingredient.unit.label] = result;
      console.log('add recipe name', recipe.recipeName);
      cart[ingredient.food].recipes[recipe.recipeName] = recipe.recipeName;
      console.log('after add recipe to set', cart[ingredient.food]);
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
