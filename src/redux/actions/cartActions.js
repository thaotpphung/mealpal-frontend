import {
  CART_ADD_BY_RECIPE,
  CART_ADD_BY_MEAL,
  CART_ADD_BY_DAY,
  CART_ADD_BY_WEEK,
  CART_UPDATE,
  CART_CLEAR,
} from '../constants/cartConstants';
import { addAlertWithTimeout } from '../actions/alertActions';
export {
  addToCartByRecipe,
  addToCartByMeal,
  addToCartByDay,
  addToCartByWeek,
  updateCart,
  clearCart,
};

const addToCartByRecipe = (recipe) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_RECIPE, payload: recipe });
  dispatch(
    addAlertWithTimeout('success', 'Successfully added to shopping list!')
  );
};

const addToCartByMeal = (meal) => async (dispatch) => {
  const cart = {};
  dispatch({ type: CART_ADD_BY_MEAL, payload: cart });
};

const addToCartByDay = (day) => async (dispatch) => {
  const cart = {};
  dispatch({ type: CART_ADD_BY_DAY, payload: cart });
};

const addToCartByWeek = (week) => async (dispatch) => {
  const cart = {};
  dispatch({ type: CART_ADD_BY_WEEK, payload: cart });
};

const updateCart = (cart) => async (dispatch) => {
  const cart = {};
  dispatch({ type: CART_UPDATE, payload: cart });
};

const clearCart = () => async (dispatch) => {
  dispatch({ type: CART_CLEAR });
};
