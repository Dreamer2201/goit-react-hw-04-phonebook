import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import PhonebookForm from '../PhonebookForm/PhonebookForm';
import Contacts from '../Contacts/Contacts';
import FilterContacts from '../FilterContacts';
import { Wrapper,Title } from './AppStyled';

export default function App() {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('listcontact')) ?? []);
  const [filter, setFilter] = useState('');
 
  useEffect(() => {
    window.localStorage.setItem('listcontact', JSON.stringify(contacts));
  }, [contacts]);
  
  useEffect(() => {
    return () => {
      localStorage.removeItem('listcontact');
    }
  }, []);

    const isDuplicate = (contact) => {
    const result = contacts.find((item) => item.name === contact.name);
    return result;
  }

  const addContact = (contact) => {
    if (isDuplicate(contact)) {
      return alert(`${contact.name} is already in Phonebook List`);
    }
    const newContact = {
        ...contact,
        id: nanoid(),
      }
    setContacts((prev) => {
      return [...prev, newContact]
    })
  }

  const deleteContact = (id) => {
    setContacts((prev) => {
      const newContacts = prev.filter((item) => item.id !== id);
      return newContacts;
    })
  }

  const handleChangeFilter = (e) => {
    const { value } = e.target;
    setFilter(value);
  }
  
  const filterContact = () => {
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

  const filteredContacts = filterContact();
  
  return(<Wrapper>
        <div>
          <Title>Phonebook</Title>
          <PhonebookForm
            onAddContact={addContact}
          />
        </div>
        <div>
          <Title>Contacts</Title>
          <FilterContacts onFilter={handleChangeFilter} />
        <Contacts items={filteredContacts}
          deleteContact={deleteContact}
        />
        </div>
      </Wrapper>)
  }

