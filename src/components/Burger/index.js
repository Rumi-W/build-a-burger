import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Ingredient from './Ingredient';

const useStyles = makeStyles(theme => ({
  burgerContainer: {
    display: 'flex',
    minHeight: '300px',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto'
  },
  burger: {
    marginTop: 'auto',
    marginBottom: 'auto',
    padding: theme.spacing(2, 0),
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '300px',
    overflow: 'auto'
  }
}));

const Burger = ({ orderIngredients }) => {
  const classes = useStyles();

  let transformedIngredients = Object.keys(orderIngredients)
    .map(igKey => {
      return [...Array(orderIngredients[igKey])].map((_, i) => {
        return <Ingredient key={`${igKey}${i}`} type={igKey} />;
      });
    })
    // flatten the array
    .reduce((total, current) => {
      return [...total, ...current];
    }, []); // initial value = []

  return (
    <div className={classes.burgerContainer}>
      <div className={classes.burger}>
        <Ingredient type="bread-top" />
        {transformedIngredients.length === 0 ? (
          <Typography variant="h4" align="center" gutterBottom>
            Please start adding ingredients
          </Typography>
        ) : null}
        {transformedIngredients}
        <Ingredient type="bread-bottom" />
      </div>
    </div>
  );
};

export default Burger;
