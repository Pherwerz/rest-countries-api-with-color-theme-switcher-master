import React from 'react';
import classes from './Header.module.scss';
import Container from '../../Container/Container';
import icon from '../../../images/icons.svg';

const Header = props => (
  <header className={classes.Header}>
    <Container>
      <div className={classes.HeaderItem}>
        <h2 className={classes.HeaderHeading}>
          Where in the world?
        </h2>

        <button
          className={classes.HeaderBtn}
          onClick={props.clicked}
        >
          <svg>
            <use
              xlinkHref={`${icon}#icon-moon-${props.icon}`}
            />
          </svg>
          <span>Dark Mode</span>
        </button>
      </div>
    </Container>
  </header>
);

export default Header;
