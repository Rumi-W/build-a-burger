import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Button } from '@material-ui/core';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import BuildControl from './BuildControl';
import Spinner from '../common/Spinner';

const useStyles = makeStyles(theme => ({
  controlsContainer: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  buttons: {
    width: '100%',
    display: 'flex',
    direction: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    }
  },
  orderButton: {
    marginRight: theme.spacing(1)
  }
}));

const BuildControls = ({
  basePrice,
  orderIngredients,
  ingredientsControl,
  quantity,
  ingredientsTotalPrice,
  handleAddIngredient,
  handleRemoveIngredient,
  handleAddToOrder,
  handleResetBuilder,
  children
}) => {
  const classes = useStyles();

  if (Object.keys(ingredientsControl).length === 0)
    return <Spinner />;

  return (
    <Box className={classes.controlsContainer}>
      <div className={classes.info}>
        <InfoTwoToneIcon color="primary" fontSize="large" />
        <Typography
          variant="subtitle1"
          display="inline"
          style={{ color: '#0c80df', marginLeft: '2px' }}>
          Adjust ingredients and quantity. Click &#39;Add to
          Order&#39;.
        </Typography>
      </div>
      <div style={{ marginBottom: '12px' }}>{children}</div>
      {Object.keys(ingredientsControl).map((key, i) => (
        <BuildControl
          key={i}
          label={ingredientsControl[key].label}
          price={ingredientsControl[key].unitPrice}
          removeDisabled={orderIngredients[key] === 0}
          addDisabled={orderIngredients[key] === 2}
          handleAddIngredient={() => handleAddIngredient(key)}
          handleRemoveIngredient={() => handleRemoveIngredient(key)}
        />
      ))}

      <Typography variant="subtitle1">
        Unit Price: $
        {parseFloat(
          parseFloat(ingredientsTotalPrice) * quantity
        ).toFixed(2)}
      </Typography>

      <div className={classes.buttons}>
        <Button
          className={classes.orderButton}
          disabled={ingredientsTotalPrice <= basePrice}
          size="medium"
          variant="contained"
          color="primary"
          onClick={handleAddToOrder}>
          Add to Order
        </Button>
        <Button
          disabled={ingredientsTotalPrice <= basePrice}
          size="medium"
          variant="contained"
          onClick={handleResetBuilder}>
          Reset Selection
        </Button>
      </div>
    </Box>
  );
};

export default BuildControls;
