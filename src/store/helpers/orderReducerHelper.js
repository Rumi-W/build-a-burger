import { calcTotalPrice } from './utilities';

export const addBurger = (state, action) => {
  const { itemType, itemKey, orderObj } = action;
  const { quantity, priceToPay } = orderObj;

  let orderToUpdate = { ...state.order };
  let subOrderToUpdate = { ...orderToUpdate[itemType] }; // burgers
  const isItemExists = Object.prototype.hasOwnProperty.call(
    subOrderToUpdate,
    itemKey
  );

  if (isItemExists) {
    subOrderToUpdate = {
      ...subOrderToUpdate,
      [itemKey]: {
        ...subOrderToUpdate[itemKey],
        quantity: subOrderToUpdate[itemKey].quantity + quantity,
        priceToPay: subOrderToUpdate[itemKey].priceToPay + priceToPay
      }
    };
  } else {
    subOrderToUpdate = {
      ...subOrderToUpdate,
      [itemKey]: { ...orderObj }
    };
  }

  orderToUpdate = { ...orderToUpdate, [itemType]: subOrderToUpdate };
  const updatedTotalPrice = calcTotalPrice(orderToUpdate);

  return {
    ...state,
    order: { ...orderToUpdate },
    totalPrice: updatedTotalPrice
  };
};

export const updateOrder = (state, action) => {
  const { itemType, itemKey, orderObj } = action;
  const { priceToPay, quantity } = orderObj;

  let orderToUpdate = { ...state.order };
  let subOrderToUpdate = { ...orderToUpdate[itemType] }; // drinks vs. burgers
  const isItemExists = Object.prototype.hasOwnProperty.call(
    subOrderToUpdate,
    itemKey
  );

  if (isItemExists) {
    // e.g. Small Soda became Qty = 0 --> delete
    if (quantity === 0) {
      delete subOrderToUpdate[itemKey];
    } else {
      subOrderToUpdate = {
        ...subOrderToUpdate,
        [itemKey]: {
          ...subOrderToUpdate[itemKey],
          ...{ quantity, priceToPay }
        }
      };
    }
  } else {
    subOrderToUpdate = {
      ...subOrderToUpdate,
      [itemKey]: { ...orderObj }
    };
  }

  orderToUpdate = { ...orderToUpdate, [itemType]: subOrderToUpdate };
  const updatedTotalPrice = calcTotalPrice(orderToUpdate);

  return {
    ...state,
    order: { ...orderToUpdate },
    totalPrice: updatedTotalPrice
  };
};

export const removeItem = (state, action) => {
  const { itemType, itemKey } = action;

  let orderToUpdate = { ...state.order };
  let subOrderToUpdate = { ...orderToUpdate[itemType] }; // drink orders

  if (
    subOrderToUpdate &&
    Object.prototype.hasOwnProperty.call(subOrderToUpdate, itemKey)
  ) {
    delete subOrderToUpdate[itemKey];
  }

  orderToUpdate = { ...orderToUpdate, [itemType]: subOrderToUpdate };
  const updatedTotalPrice = calcTotalPrice(orderToUpdate);

  return {
    ...state,
    order: { ...orderToUpdate },
    totalPrice: updatedTotalPrice
  };
};

export const addOne = (state, action) => {
  const { itemType, itemKey } = action;
  let orderToUpdate = { ...state.order };
  let subOrderToUpdate = { ...orderToUpdate[itemType] }; // drink orders

  if (
    subOrderToUpdate &&
    Object.prototype.hasOwnProperty.call(subOrderToUpdate, itemKey)
  ) {
    const newQty = subOrderToUpdate[itemKey].quantity + 1;
    subOrderToUpdate[itemKey].quantity = newQty;
    subOrderToUpdate[itemKey].priceToPay =
      newQty * subOrderToUpdate[itemKey].unitPrice;
  }
  orderToUpdate = { ...orderToUpdate, [itemType]: subOrderToUpdate };
  const updatedTotalPrice = calcTotalPrice(orderToUpdate);

  return {
    ...state,
    order: { ...orderToUpdate },
    totalPrice: updatedTotalPrice
  };
};

export const subtractOne = (state, action) => {
  const { itemType, itemKey } = action;
  let orderToUpdate = { ...state.order };
  let subOrderToUpdate = { ...orderToUpdate[itemType] }; // drink orders

  if (
    subOrderToUpdate &&
    Object.prototype.hasOwnProperty.call(subOrderToUpdate, itemKey)
  ) {
    if (subOrderToUpdate[itemKey].quantity === 0) {
      return { ...state };
    }
    const newQty = subOrderToUpdate[itemKey].quantity - 1;
    subOrderToUpdate[itemKey].quantity = newQty;
    subOrderToUpdate[itemKey].priceToPay =
      newQty * subOrderToUpdate[itemKey].unitPrice;
  }
  orderToUpdate = { ...orderToUpdate, [itemType]: subOrderToUpdate };
  const updatedTotalPrice = calcTotalPrice(orderToUpdate);

  return {
    ...state,
    order: { ...orderToUpdate },
    totalPrice: updatedTotalPrice
  };
};
