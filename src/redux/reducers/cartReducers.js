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

const addName = (ingredient, name, cart) => {
  if (
    cart[ingredient.ingredientName]?.recipes &&
    cart[ingredient.ingredientName].recipes.indexOf(name) === -1
  ) {
    cart[ingredient.ingredientName].recipes.push(name);
  }
};

const addIngredient = (ingredient, cart, name = '') => {
  if (ingredient.amount.toString !== '' && ingredient.ingredientName !== '') {
    // initialize ingredient name
    cart[ingredient.ingredientName] = cart[ingredient.ingredientName]
      ? cart[ingredient.ingredientName]
      : { units: {}, recipes: [], checked: false, showDetails: false };
    // initialize unit
    if (!(ingredient.unit.label in cart[ingredient.ingredientName].units)) {
      cart[ingredient.ingredientName].units[ingredient.unit.label] = {};
    }
    // compute
    let current = cart[ingredient.ingredientName].units[ingredient.unit.label];
    if (Object.keys(current).length === 0)
      current = { whole: 0, numer: 0, denom: 1 };
    let result = addMixedNumber(current, ingredient.amount);
    cart[ingredient.ingredientName].units[ingredient.unit.label] = result;
    if (name !== '') {
      addName(ingredient, name, cart);
    }
  }
};

// if name is provided, then that means we're adding this recipe from a meal/day/week
// so we will add the name of the meal/day/week accordingly
const addRecipe = (recipe, cart, name = '') => {
  recipe?.ingredients.forEach((ingredient) => {
    // add recipe name
    addIngredient(ingredient, cart, recipe.name);
    // add meal/day/week name if provided
    if (name !== '') {
      addName(ingredient, name, cart);
    }
  });
};

// if name is provided, then that means we're adding this meal from a day/week
// so we will add the name of the day/week accordingly
const addMeal = (meal, cart, name = '') => {
  // name added could be meal name or day/week name, if name is provided - day/week name takes precedence over meal name
  meal?.recipes.forEach((recipe) => {
    addRecipe(recipe, cart, name !== '' ? name : meal.name);
  });
  meal.food.forEach((ingredient) => {
    addIngredient(ingredient, cart, name !== '' ? name : meal.name);
  });
};

const addDay = (day, cart, name = '') => {
  day?.meals.forEach((meal) => {
    addMeal(meal, cart, name !== '' ? name : day.name);
  });
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_BY_RECIPE: {
      const recipe = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      addRecipe(recipe, updatedCart);
      return {
        cart: updatedCart,
      };
    }
    case CART_ADD_BY_WEEK: {
      const week = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      week.days.forEach((day) => {
        addDay(day, updatedCart, week.name);
      });
      return {
        cart: updatedCart,
      };
    }
    case CART_ADD_BY_DAY: {
      const day = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      addDay(day, updatedCart);
      return {
        cart: updatedCart,
      };
    }
    case CART_ADD_BY_MEAL: {
      const meal = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      addMeal(meal, updatedCart);
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
