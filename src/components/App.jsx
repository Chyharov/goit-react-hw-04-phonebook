import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

useEffect(() => {
  const parsedContacts = JSON.parse(window.localStorage.getItem('contacts'));
  if (parsedContacts) {
    setContacts(parsedContacts);
  }
}, []);

useEffect(() => {
  window.localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts]);

const addContact = (name, number) => {

    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      return toast.error(`Name: ${name} is already in contacts.`);
    }

    if (contacts.find(contact => contact.number === number)) {
      return toast.error(`Number: ${number} is already in contacts.`);
    }

    const newContact = {
      id: uuidv4(),
      name,
      number,
    };

    setContacts([newContact, ...contacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilterChange={changeFilter} />
        <ContactList
          contact={visibleContacts}
          onDeleteContact={deleteContact}
        />
        <ToastContainer position="top-center" autoClose={5000}></ToastContainer>
      </div>
    );
  }
