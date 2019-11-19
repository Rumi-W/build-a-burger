export const calcTotalPrice = orderObj => {
  let total = 0.0;
  if (orderObj && Object.keys(orderObj).length > 0) {
    Object.keys(orderObj).forEach(key1 => {
      if (orderObj[key1] && Object.keys(orderObj[key1]).length > 0) {
        Object.keys(orderObj[key1]).forEach(key2 => {
          total += parseFloat(orderObj[key1][key2].priceToPay);
        });
      } // end if
    });
  } // end if
  return total;
};
