import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main/Main';
import classes from './Layout.module.scss';

const Layout = props => (
  <div className={classes.Layout}>
    <Header icon={props.icon} clicked={props.clicked} />
    <Main />
    <Footer />
  </div>
);

export default Layout;
