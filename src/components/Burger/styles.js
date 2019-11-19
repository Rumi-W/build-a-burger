export const ingredientsStyles = {
  breadBottom: {
    height: '5vh',
    width: `80%`,
    background: 'linear-gradient(#f08e4a, #e27b36)',
    borderRadius: '0 0 30px 30px',
    boxShadow: 'inset -15px 0 #c15711',
    margin: '1% auto'
  },
  breadTop: {
    height: '8vh',
    width: `80%`,
    background: 'linear-gradient(#f08e4a, #e27b36)',
    borderRadius: '50% 50% 0 0',
    boxShadow: 'inset -15px 0 #c15711',
    margin: '1% auto'
  },
  seeds1: {
    height: '12%',
    width: `8%`,
    position: 'relative',
    backgroundColor: '#fff',
    left: '25%',
    top: '50%',
    borderRadius: '40%',
    transform: 'rotate(-20deg)',
    boxShadow: 'inset -2px -3px #c9c9c',
    '&::before': {
      content: "''",
      display: 'block',
      height: '100%',
      width: `100%`,
      color: '#000',
      position: 'relative',
      backgroundColor: '#fff',
      left: '500%',
      top: '300%',
      borderRadius: '40%',
      transform: 'rotate(-20deg)',
      boxShadow: 'inset -2px -3px #c9c9c'
    },
    '&::after': {
      content: "''",
      display: 'block',
      height: '100%',
      width: `100%`,
      color: '#000',
      position: 'relative',
      backgroundColor: '#fff',
      left: '-200%',
      top: '-200%',
      borderRadius: '40%',
      transform: 'rotate(-20deg)',
      boxShadow: 'inset -2px -3px #c9c9c'
    }
  },
  seeds2: {
    height: '12%',
    width: `8%`,
    position: 'relative',
    backgroundColor: '#fff',
    left: '50%',
    top: '50%',
    borderRadius: '40%',
    transform: 'rotate(-20deg)',
    boxShadow: 'inset -2px -3px #c9c9c',
    '&::before': {
      content: "''",
      display: 'block',
      height: '100%',
      width: `100%`,
      color: '#000',
      position: 'relative',
      backgroundColor: '#fff',
      left: '400%',
      top: '300%',
      borderRadius: '40%',
      transform: 'rotate(-20deg)',
      boxShadow: 'inset -2px -3px #c9c9c'
    },
    '&::after': {
      content: "''",
      display: 'block',
      height: '100%',
      width: `100%`,
      color: '#000',
      position: 'relative',
      backgroundColor: '#fff',
      left: '-100%',
      top: '-400%',
      borderRadius: '40%',
      transform: 'rotate(-40deg)',
      boxShadow: 'inset -2px -3px #c9c9c'
    }
  },
  meat: {
    height: '4vh',
    width: `80%`,
    background: 'linear-gradient(#7f3608, #702e05)',
    borderRadius: '15px',
    margin: '1% auto'
  },
  cheese: {
    height: '2vh',
    width: `90%`,
    background: 'linear-gradient(#f4d004, #d6bb22)',
    borderRadius: '25px',
    margin: '1% auto'
  },
  lettuce: {
    height: '1.5vh',
    width: `95%`,
    background: 'linear-gradient(#228c1d, #91ce50)',
    borderRadius: '25px',
    margin: '1% auto'
  },
  bacon: {
    height: '1.8vh',
    width: `80%`,
    background: 'linear-gradient(#bf3813, #c45e38)',
    borderRadius: '15px',
    margin: '1% auto'
  }
};
