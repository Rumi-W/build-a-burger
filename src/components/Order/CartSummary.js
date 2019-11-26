import React from 'react';
import Wrapper from '../../hoc/Wrapper';
import OrderItems from './OrderItems';

const CartSummary = ({ order, totalPrice, children }) => {
  return (
    <Wrapper>
      <OrderItems
        isEditable={false}
        totalPrice={totalPrice}
        order={order}
      />
      {children}
    </Wrapper>
  );
};

export default CartSummary;
