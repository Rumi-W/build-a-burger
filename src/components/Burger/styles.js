import meatImg from '../../assets/images/meat.png';
import cheeseImg from '../../assets/images/cheese.png';
import lettuceImg from '../../assets/images/lettuce.png';
import baconImg from '../../assets/images/bacon.png';
import tomatoImg from '../../assets/images/tomato.png';
import bunTopImg from '../../assets/images/bun-top.png';
import bunBottomImg from '../../assets/images/bun-bottom.png';

export const ingredientsStyles = theme => ({
  breadTop: {
    height: '9vh',
    minHeight: '70px',
    maxHeight: '75px',
    width: `80%`,
    backgroundImage: `url(${bunTopImg})`,
    backgroundSize: '240px',
    backgroundRepeat: 'no-repeat',
    margin: '0 auto -6px auto'
  },
  breadBottom: {
    height: '6vh',
    minHeight: '60px',
    width: `80%`,
    backgroundImage: `url(${bunBottomImg})`,
    backgroundSize: '240px',
    backgroundRepeat: 'no-repeat',
    margin: '-10px auto -10px auto'
  },
  meat: {
    height: '6vh',
    minHeight: '50px',
    width: `80%`,
    backgroundImage: `url(${meatImg})`,
    backgroundSize: '240px 50px',
    backgroundRepeat: 'no-repeat',
    margin: '0 auto -10px auto',
    zIndex: 20
  },
  cheese: {
    height: '3vh',
    minHeight: '30px',
    maxHeight: '34px',
    width: `100%`,
    backgroundImage: `url(${cheeseImg})`,
    backgroundSize: '340px 34px',
    backgroundRepeat: 'no-repeat',
    margin: '0 auto -8px auto',
    zIndex: 22
  },
  lettuce: {
    height: '4vh',
    minHeight: '34px',
    width: `95%`,
    backgroundImage: `url(${lettuceImg})`,
    backgroundSize: '280px 40px',
    backgroundRepeat: 'no-repeat',
    margin: '-10px auto -10px auto',
    zIndex: 21
  },
  bacon: {
    height: '4vh',
    minHeight: '30px',
    maxHeight: '40px',
    width: `95%`,
    backgroundImage: `url(${baconImg})`,
    backgroundSize: '280px 40px',
    backgroundRepeat: 'no-repeat',
    margin: '0 auto -10px auto',
    zIndex: 23
  },
  tomato: {
    height: '4vh',
    minHeight: '30px',
    maxHeight: '40px',
    width: `76%`,
    backgroundImage: `url(${tomatoImg})`,
    backgroundSize: '220px 40px',
    backgroundRepeat: 'no-repeat',
    margin: '0 auto -10px auto',
    zIndex: 24
  }
});
