import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactForm';
import { Layout } from './Layout/Layout.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contactName', JSON.stringify(this.state.contacts))
    }
  }

  componentDidMount() {
    const savedContact = localStorage.getItem('contactName')
    if(savedContact !== null) {
      this.setState({
        contacts: JSON.parse(savedContact)
      })
    }
  }
  
  

  filterchange = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  addContact = (values) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
  }
  this.setState(prevState => ({
    contacts: [...prevState.contacts, newContact],
  }));
}

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <Layout>
        <h1>Phonebook</h1>
        <ContactForm contacts={this.state.contacts} addContact={this.addContact}/>
        <h2>Contacts</h2>
        <Filter value={filter} filterchange={this.filterchange} />
        <ContactList
          onDelete={this.deleteContact}
          contacts={this.state.contacts}
          filteredContacts={filteredContacts}
        />
      </Layout>
    );
  }
}
