import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Container from './components/Container';
import Filter from './components/Filter/Filter';
import Section from './components/Section/Section';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  // читає дані з localStorage
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    // перевіряє чи не null
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  // оновлює дані в localStorage
  componentDidUpdate(prevProps, prevState) {
    // при відмінному state.contacts, оновлює localStorage
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // видаляє контакт по кліку на кнопку Delete
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(cont => cont.id !== contactId),
    }));
  };

  // отримує параметри з Форми, додає ІД, формує повноцінний контакт
  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    // створює контакт
    const id = uuidv4();
    const contact = { id, name, number };

    // перевіряє чи відсутні дублі по імені
    if (
      contacts.find(
        oldContact => oldContact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      return alert(`${name} is already in contact`);
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  // фільтрує створені контакти
  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(person =>
      person.name.toLowerCase().includes(normalizeFilter),
    );
  };

  // пише значення в Стейт
  changeFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    const { filter } = this.state;
    const {
      deleteContact,
      addContact,
      changeFilter,
      getFilteredContacts,
    } = this;
    const filteredContacts = getFilteredContacts();

    return (
      <Container>
        <Section>
          <h1>Phonebook</h1>
          <ContactForm getContactData={addContact} />
        </Section>
        <Section>
          <h2>Contacts</h2>
          <Filter filter={filter} changeFilter={changeFilter} />
          <ContactList
            contactList={filteredContacts}
            onDeleteContact={deleteContact}
          />
        </Section>
      </Container>
    );
  }
}

export default App;
