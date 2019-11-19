import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ingredientsStyles } from './styles';

const useStyles = makeStyles(theme => ingredientsStyles);

const Ingredient = ({ type }) => {
  let ingredient = null;

  const classes = useStyles();
  switch (type) {
    case 'bread-bottom':
      ingredient = <div className={classes.breadBottom} />;
      break;
    case 'bread-top':
      ingredient = (
        <div className={classes.breadTop}>
          <div className={classes.seeds1} />
          <div className={classes.seeds2} />
        </div>
      );
      break;
    case 'meat':
      ingredient = <div className={classes.meat} />;
      break;
    case 'cheese':
      ingredient = <div className={classes.cheese} />;
      break;
    case 'bacon':
      ingredient = <div className={classes.bacon} />;
      break;
    case 'lettuce':
      ingredient = <div className={classes.lettuce} />;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

// class Ingredient extends Component {
//   render() {
//     let ingredient = null;
//     switch (this.props.type) {
//       case 'bread-bottom':
//         ingredient = <div className={classes.BreadBottom} />;
//         break;
//       case 'bread-top':
//         ingredient = (
//           <div className={classes.BreadTop}>
//             <div className={classes.Seeds1} />
//             <div className={classes.Seeds2} />
//           </div>
//         );
//         break;
//       case 'meat':
//         ingredient = <div className={classes.Meat} />;
//         break;
//       case 'cheese':
//         ingredient = <div className={classes.Cheese} />;
//         break;
//       case 'bacon':
//         ingredient = <div className={classes.Bacon} />;
//         break;
//       case 'lettus':
//         ingredient = <div className={classes.Lettus} />;
//         break;
//       default:
//         ingredient = null;
//     }
//     return ingredient;
//   }
// }

Ingredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default Ingredient;
