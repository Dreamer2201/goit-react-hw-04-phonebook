import { Component } from 'react';
import { nanoid } from 'nanoid';
import PhonebookForm from '../PhonebookForm/PhonebookForm';
import Contacts from '../Contacts/Contacts';
import FilterContacts from '../FilterContacts';
import { Wrapper,Title } from './AppStyled';

export class App extends Component {
  state = {
    contacts: [],
    filter: ''
  };

  componentDidMount() {
    const listContacts = localStorage.getItem('listcontact');
    const parsedContacts = JSON.parse(listContacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      })
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('listcontact', JSON.stringify(this.state.contacts));
      return;
    }
  }
  
  addContact = (contact) => {
    if (this.isDuplicate(contact)) {
      return alert(`${contact.name} is already in Phonebook List`);
    }
    this.setState((prev) => {
      const newContact = {
        ...contact,
        id: nanoid(),
      }
      return {
        contacts: [...prev.contacts, newContact]
      }
    })
  }

  deleteContact = (id) => {
    this.setState((prev) => {
      const newContacts = prev.contacts.filter((item) => item.id !== id);
      return {
        contacts: newContacts
      }
    })
  }

  handleChangeFilter = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }
  
  filterContact() {
    const { contacts, filter } = this.state;
    const filterNormolaze = filter.toLocaleLowerCase();
    if (!filter) {
      return contacts;
    }
    const filterContacts = contacts.filter(({ name }) => {
      const nameContactNormolaze = name.toLocaleLowerCase();
      const resultFilter = nameContactNormolaze.includes(filterNormolaze);
      return resultFilter;
    })
    return filterContacts;
  }

  isDuplicate = (contact) => {
    const { contacts } = this.state;
    const result = contacts.find((item) => item.name === contact.name);
    return result;
  }

  render() {
    const contacts = this.filterContact();
    return (
      <Wrapper>
        <div>
          <Title>Phonebook</Title>
          <PhonebookForm onAddContact={this.addContact} />
        </div>
        <div>
          <Title>Contacts</Title>
          <FilterContacts onFilter={this.handleChangeFilter} />
          <Contacts items={contacts} deleteContact={this.deleteContact} />
        </div>
      </Wrapper>
    );
  }
};
