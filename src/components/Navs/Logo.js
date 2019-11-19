import React from 'react';
import burgerImg from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const Logo = () => (
  <div className={classes.Logo}>
    <img className={classes.img} src={burgerImg} alt="hamburger" />
  </div>
);

export default Logo;
