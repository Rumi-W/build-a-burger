import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { ingredientsStyles } from './styles';

const useStyles = makeStyles(theme => ingredientsStyles(theme));

const Ingredient = ({ type }) => {
  let ingredient = null;

  const classes = useStyles();
  switch (type) {
    case 'bread-bottom':
      ingredient = <div className={classes.breadBottom} />;
      break;
    case 'bread-top':
      ingredient = <div className={classes.breadTop} />;
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
    case 'tomato':
      ingredient = <div className={classes.tomato} />;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

Ingredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default Ingredient;
