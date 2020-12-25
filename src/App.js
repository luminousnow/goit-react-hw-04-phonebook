import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Container from './components/Container';
import Filter from './components/Filter/Filter';
import Section from './components/Section/Section';

function App() {
  // === State === //
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  // === LocalStorage === //
  // getting data from LocalStorage
  useEffect(() => {
    // const contacts = window.localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(window.localStorage.getItem('contacts'));

    // getting data if it located there earlier and storage wasn't empty
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  // set || update data in LocalStorage
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // === Contacts === //
  // create new contact (id, name, number)
  const addContact = ({ name, number }) => {
    const id = uuidv4();
    const contact = { id, name, number };

    // verify input value is it duplicate
    if (
      contacts.find(
        oldContact => oldContact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      return alert(`${name} is already in contact`);
    }

    // add new contact to contacts
    setContacts(prevState => [contact, ...prevState]);
  };

  // delete contact by id (when Delete button is click)
  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(cont => cont.id !== contactId));
  };

  // === Filter === //
  // write value to State when input is change
  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  // finde contact in contacs
  const getFilteredContacts = () => {
    // converting all char to lowercase
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(person =>
      person.name.toLowerCase().includes(normalizeFilter),
    );
  };

  return (
    <>
      <Container>
        <Section>
          <h1>Phonebook</h1>
          <ContactForm getContactData={addContact} />
        </Section>
        <Section>
          <h2>Contacts</h2>
          <Filter filter={filter} changeFilter={changeFilter} />
          <ContactList
            contactList={getFilteredContacts()}
            onDeleteContact={deleteContact}
          />
        </Section>
      </Container>
    </>
  );
}

export default App;
