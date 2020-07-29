import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Link.module.scss';

const Links = props => {
  return (
    <Link
      className={classes.Links}
      onClick={props.clicked}
      to={props.path}
    >
      {props.children}
    </Link>
  );
};

export default Links;
