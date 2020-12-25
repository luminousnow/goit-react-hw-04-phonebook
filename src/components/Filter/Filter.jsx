import React from 'react';
import { string, func } from 'prop-types';
import s from './Filter.module.css';

function Filter({ filter, changeFilter }) {
  return (
    <label className={s.label}>
      <span>find contact by name</span>
      <input
        type="text"
        name="filter"
        id="filter"
        value={filter}
        onChange={changeFilter}
        className={s.input}
      />
    </label>
  );
}

Filter.propTypes = {
  filter: string.isRequired,
  changeFilter: func.isRequired,
};

export default Filter;
