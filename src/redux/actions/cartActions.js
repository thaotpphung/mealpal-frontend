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

const addToCartByRecipe = (recipe, router) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_RECIPE, payload: recipe });
  router.push('/cart');
  dispatch(
    addAlertWithTimeout(
      'warning',
      'This cart was automatically generated and might be not accurate, please make changes as you wish!'
    )
  );
};

const addToCartByMeal = (meal, router) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_MEAL, payload: meal });
  router.push('/cart');
  dispatch(
    addAlertWithTimeout(
      'warning',
      'This cart was automatically generated and might be not accurate, please make changes as you wish!'
    )
  );
};

const addToCartByDay = (day, router) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_DAY, payload: day });
  router.push('/cart');
  dispatch(
    addAlertWithTimeout(
      'warning',
      'This cart was automatically generated and might be not accurate, please make changes as you wish!'
    )
  );
};

const addToCartByWeek = (week, router) => async (dispatch) => {
  dispatch({ type: CART_ADD_BY_WEEK, payload: week });
  router.push('/cart');
  dispatch(
    addAlertWithTimeout(
      'warning',
      'This cart was automatically generated and might be not accurate, please make changes as you wish!'
    )
  );
};

const updateCart = (cart) => async (dispatch) => {
  const cart = {};
  dispatch({ type: CART_UPDATE, payload: cart });
};

const clearCart = () => async (dispatch) => {
  dispatch({ type: CART_CLEAR });
};
