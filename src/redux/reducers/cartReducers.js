import {
  CART_ADD_BY_RECIPE,
  CART_ADD_BY_MEAL,
  CART_ADD_BY_DAY,
  CART_ADD_BY_WEEK,
  CART_UPDATE,
  CART_CLEAR,
} from '../constants/cartConstants';
import { addMixedNumber } from '../../utils/mixedNumber';
import cloneDeep from 'lodash/cloneDeep';

const INITIAL_STATE = {
  cart: {},
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_BY_RECIPE: {
      const ingredients = action.payload;
      const updatedCart = cloneDeep(state.cart);
      console.log('updated', updatedCart);
      ingredients.forEach((ingredient) => {
        // updatedCart[ingredient.food][ingredient.unit.label] = addMixedNumber(
        //   updatedCart[ingredient.food][ingredient.unit.label],
        //   ingredient.amount
        // );
      });

      console.log('after', updatedCart);
      return {
        cart: updatedCart,
      };
    }
    case CART_ADD_BY_MEAL:
    case CART_ADD_BY_DAY:
    case CART_ADD_BY_WEEK:
    case CART_UPDATE: {
      return {
        cart: action.payload,
      };
    }

    case CART_CLEAR:
      return {};

    default:
      return state;
  }
};

export default cartReducer;
