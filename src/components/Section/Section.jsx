import React from 'react';
import { node } from 'prop-types';
import s from './Section.module.css';

function Section({ children }) {
  return <section className={s.section}>{children}</section>;
}

Section.propTypes = {
  children: node.isRequired,
};

export default Section;
