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
import { ContactsOutlined } from '@material-ui/icons';

const INITIAL_STATE = {
  cart: {},
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CART_ADD_BY_RECIPE: {
      const recipe = action.payload;
      let updatedCart = cloneDeep(state.cart);
      if (updatedCart === undefined) updatedCart = {};
      recipe.ingredients.forEach((ingredient) => {
        updatedCart[ingredient.food] = updatedCart[ingredient.food]
          ? updatedCart[ingredient.food]
          : {};
        if (!(ingredient.unit.label in updatedCart[ingredient.food])) {
          updatedCart[ingredient.food][ingredient.unit.label] = {};
        }
        let current = updatedCart[ingredient.food][ingredient.unit.label];
        if (Object.keys(current).length === 0)
          current = { whole: 0, numer: 0, denom: 1 };
        const result = addMixedNumber(current, ingredient.amount);
        updatedCart[ingredient.food][ingredient.unit.label] = result;
      });
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
