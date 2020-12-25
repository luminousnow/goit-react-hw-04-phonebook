import React from 'react';
import { node } from 'prop-types';
import s from './Container.module.css';

function Container({ children }) {
  return <div className={s.container}>{children}</div>;
}

Container.propTypes = {
  children: node.isRequired,
};

export default Container;
