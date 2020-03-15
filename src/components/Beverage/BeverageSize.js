import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  InputAdornment
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  input: {
    padding: 0,
    textAlign: 'center',
    fontSize: '18px',
    height: 40,
    width: 50
  }
}));
const BeverageSize = ({
  itemKey,
  parentKey,
  label,
  sizeLabel,
  price,
  drinkOrder,
  handleOrderChange
}) => {
  const classes = useStyles();

  const [didMount, setDidMount] = useState(false);
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setDidMount(true);
    updateOrderData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (didMount) {
      updateOrderData();
    }
    //eslint-disable-next-line
   }, [drinkOrder]);

  const updateOrderData = () => {
    let isSelected = false;
    let qty = 0;

    if (drinkOrder && Object.prototype.hasOwnProperty.call(drinkOrder, itemKey)) {
      isSelected = true;
      qty = drinkOrder[itemKey].quantity;
    }
    setSelected(isSelected);
    setQuantity(qty);
  };

  // checkbox
  const handleChange = () => {
    const current = selected;
    let qty = 0;

    if (!current) qty = 1;

    setSelected(prevSelection => !prevSelection);
    setQuantity(qty);

    const orderObj = {
      parentKey,
      unitPrice: price,
      priceToPay: parseFloat(qty * price),
      quantity: parseInt(qty, 10),
      item: `${label} ${sizeLabel}`
    };
    handleOrderChange('beverages', itemKey, orderObj);
  };

  const handleQuantityChange = e => {
    e.preventDefault();
    e.stopPropagation();

    const qty = e.currentTarget.value;
    setQuantity(qty);

    const orderObj = {
      parentKey,
      unitPrice: price,
      priceToPay: parseFloat(qty * price),
      quantity: parseInt(qty, 10),
      item: `${label} ${sizeLabel}`
    };
    handleOrderChange('beverages', itemKey, orderObj);
  };

  return (
    <Grid container direction="row">
      <Grid item xs={12} sm={7} md={7}>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              className={classes.checkboxRoot}
              checked={selected}
              onChange={handleChange}
              value={itemKey}
            />
          }
          label={
            <Typography variant="subtitle1">
              {sizeLabel} ($
              {price.toFixed(2)})
            </Typography>
          }
        />
      </Grid>
      <Grid item xs={12} sm={5} md={5}>
        <FormControl variant="outlined">
          <OutlinedInput
            disabled={!selected}
            id={`${itemKey}-quantity`}
            type="number"
            value={quantity}
            margin="none"
            onChange={handleQuantityChange}
            startAdornment={
              <InputAdornment position="start">
                <Typography variant="subtitle2">Quantity: </Typography>
              </InputAdornment>
            }
            inputProps={{
              className: classes.input,
              min: 0
            }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default BeverageSize;
