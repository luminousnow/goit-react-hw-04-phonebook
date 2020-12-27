import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Container from './components/Container';
import Filter from './components/Filter/Filter';
import Section from './components/Section/Section';

function App() {
  // === State === //
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts') ?? []),
  );
  const [filter, setFilter] = useState('');

  // === Оновлює запис contacts в LocalStorage === //
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // === Створює новий Контакт === //
  const addContact = (name, number) => {
    const id = uuidv4();
    const contact = { id, name, number };

    // перевіряє введене ім'я на унікальність
    if (
      contacts.find(
        oldContact => oldContact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      // повідомлення при виявлені існуючого імені
      return alert(`${name} is already in contact`);
    }

    // додає створений контакт до списку контактів
    setContacts(prevState => [contact, ...prevState]);
  };

  // === Видаляє контакт (клік на кнопці Delete) === //
  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(cont => cont.id !== contactId));
  };

  // === Оновлює значення поля Filter у стейті === //
  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  // === Шукає контакт у списку контактів === //
  const getFilteredContacts = () => {
    // робить усі символи введені в поле фільтр з малої літери
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
