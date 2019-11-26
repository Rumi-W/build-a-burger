import {
  COPY_BURGER_ORDER_INGREDIENTS,
  ADD_BURGER_ORDER_INGREDIENTS,
  REDUCE_BURGER_ORDER_INGREDIENTS,
  RESET_BURGER_ORDER
} from './actionTypes';

export const addBurgerOrderIngredients = ingredientType => ({
  type: ADD_BURGER_ORDER_INGREDIENTS,
  ingredientType
});

export const reduceBurgerOrderIngredients = ingredientType => ({
  type: REDUCE_BURGER_ORDER_INGREDIENTS,
  ingredientType
});

export const resetBurgerOrder = () => ({
  type: RESET_BURGER_ORDER
});

export const copyBurgerOrderIngredients = (
  ingredients,
  quantity,
  keyToBeReplaced
) => ({
  type: COPY_BURGER_ORDER_INGREDIENTS,
  ingredients,
  quantity,
  keyToBeReplaced
});
