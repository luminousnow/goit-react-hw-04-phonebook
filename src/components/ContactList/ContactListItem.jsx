import React from 'react';
import { string, func } from 'prop-types';
import s from './ContactListItem.module.css';

function ContactListItem({ name, number, onDeleteContact }) {
  return (
    <li className={s.listItem}>
      <p className={s.text}>
        {name}: {number}
      </p>
      <button type="button" className={s.button} onClick={onDeleteContact}>
        delete
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  name: string.isRequired,
  number: string.isRequired,
  onDeleteContact: func.isRequired,
};

export default ContactListItem;
