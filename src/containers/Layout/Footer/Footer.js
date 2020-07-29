import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => (
  <footer className={classes.Footer}>
    <p className={classes.attribution}>
      Challenge by{' '}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        target="_blank"
        rel="noopener noreferrer"
      >
        Frontend Mentor
      </a>
      . Coded by <a href="foot">Adebayo Fawaz</a>.
    </p>
  </footer>
);

export default Footer;
