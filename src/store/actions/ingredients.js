import {
  FETCH_INGREDIENTS_START,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAIL
} from './actionTypes';
import axios from '../../axios-orders';

const setIngredientsStart = () => ({
  type: FETCH_INGREDIENTS_START
});

const setIngredientsSuccess = data => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  ingredients: data
});

const setIngredientsFail = () => ({
  type: FETCH_INGREDIENTS_FAIL
});

export const fetchIngredients = () => dispatch => {
  dispatch(setIngredientsStart());

  axios
    .get('/ingredients.json')
    .then(response => {
      if (response.data && response.status === 200) {
        dispatch(setIngredientsSuccess(response.data));
      } else {
        dispatch(setIngredientsFail());
      }
    })
    .catch(e => {
      dispatch(setIngredientsFail());
      console.log('Error', e);
    });
};

// axios
//       .get('/ingredients.json')
//       .then(response => {
//         initState = {
//           ...initState,
//           orderIngredients: this.makeIngredientsList(response.data),
//           ingredientsControl: this.makeIngredientsControl(
//             response.data
//           )
//         };

//         this.setState(() => ({
//           ...initState
//         }));
//       })
//       .catch(error => {
//         console.log('error orderIngredients', error);
//         this.setState(() => ({
//           loadIngredientsError: true
//         }));
//       });
