import {
  ADD_ORDER_INGREDIENTS,
  REDUCE_ORDER_INGREDIENTS,
  RESET_ORDER_INGREDIENTS
} from './actionTypes';

export const addOrderIngredients = ingredientType => ({
  type: ADD_ORDER_INGREDIENTS,
  ingredientType
});

export const reduceOrderIngredients = ingredientType => ({
  type: REDUCE_ORDER_INGREDIENTS,
  ingredientType
});

export const resetOrderIngredients = () => ({
  type: RESET_ORDER_INGREDIENTS
});
