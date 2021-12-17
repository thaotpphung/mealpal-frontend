import {
  CART_ADD_BY_RECIPE,
  CART_ADD_BY_MEAL,
  CART_ADD_BY_DAY,
  CART_ADD_BY_WEEK,
  CART_UPDATE,
  CART_CLEAR,
} from '../constants/cartConstants';
import { addAlertWithTimeout } from './alertActions';
export {
  addToCartByRecipe,
  addToCartByMeal,
  addToCartByDay,
  addToCartByWeek,
  updateCart,
  clearCart,
};

const addToCartByRecipe = (recipe, router) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_RECIPE, payload: recipe });
  router.push('/cart');
  dispatch(addAlertWithTimeout('success', 'Successfully added to cart!'));
};

const addToCartByMeal = (meal, router) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_MEAL, payload: meal });
  router.push('/cart');
  dispatch(addAlertWithTimeout('success', 'Successfully added to cart!'));
};

const addToCartByDay = (day, router) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_DAY, payload: day });
  router.push('/cart');
  dispatch(addAlertWithTimeout('success', 'Successfully added to cart!'));
};

const addToCartByWeek = (week, router) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_WEEK, payload: week });
  router.push('/cart');
  dispatch(addAlertWithTimeout('success', 'Successfully added to cart!'));
};

const updateCart = (cart) => async (dispatch) => {
  dispatch({ type: CART_UPDATE, payload: cart });
};

const clearCart = () => async (dispatch) => {
  dispatch({ type: CART_CLEAR });
};
