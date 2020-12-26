import React, { useState } from 'react';
import s from './ContactForm.module.css';

function ContactForm({ getContactData }) {
  // === State === //
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // === rerender input fields value === //
  const handleImputChange = e => {
    const { name, value } = e.currentTarget;

    // verify & set value to State
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  // on press submit button
  const onSubmitPress = e => {
    e.preventDefault();

    // send values to State Арр.js
    getContactData(name, number);

    resetFormField();
  };

  // clean up form fields after form submission
  const resetFormField = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={onSubmitPress} className={s.form}>
        <fieldset className={s.fieldset}>
          <label className={s.label}>
            <span>name</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleImputChange}
              className={s.input}
            />
          </label>
          <label className={s.label}>
            <span>number</span>
            <input
              type="tel"
              name="number"
              value={number}
              onChange={handleImputChange}
              className={s.input}
            />
          </label>
          <button
            type="submit"
            className={s.button}
            disabled={!(name && number)}
          >
            <span>add contacts</span>
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default ContactForm;
