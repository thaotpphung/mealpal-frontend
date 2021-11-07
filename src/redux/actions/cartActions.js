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
  dispatch(addAlertWithTimeout('success', 'Successfully added to cart!'));
};

const addToCartByMeal = (meal) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_MEAL, payload: meal });
  dispatch(addAlertWithTimeout('success', 'Successfully added to cart!'));
};

const addToCartByDay = (day) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_DAY, payload: day });
  dispatch(addAlertWithTimeout('success', 'Successfully added to cart!'));
};

const addToCartByWeek = (week) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_WEEK, payload: week });
  dispatch(addAlertWithTimeout('success', 'Successfully added to cart!'));
};

const updateCart = (cart) => async (dispatch) => {
  const cart = {};
  dispatch({ type: CART_UPDATE, payload: cart });
  dispatch(addAlertWithTimeout('success', 'Successfully updated cart!'));
};

const clearCart = () => async (dispatch) => {
  dispatch({ type: CART_CLEAR });
};
