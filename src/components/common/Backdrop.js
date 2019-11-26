import React from 'react';

const style = {
  width: '100%',
  height: '100%',
  position: 'fixed',
  zIndex: '50',
  left: 0,
  top: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)'
};
const Backdrop = ({ show }) => (show ? <div style={style} /> : null);

export default Backdrop;
