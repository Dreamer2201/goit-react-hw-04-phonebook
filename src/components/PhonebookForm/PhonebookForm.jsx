import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Form, Btn } from './PhonebookFormStyled';
import { InputName } from '../App/AppStyled';
   
export default function PhonebookForm({onAddContact}) {

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case "name":
                setName(value);
                break;
            case "number":
                setNumber(value);
                break;
            default: return;
        }
    }

    const handleSubmitPhonebookForm = (e) => {
        e.preventDefault();
        const contact = {
            name,
            number,
        }
        onAddContact(contact);
        setName('');
        setNumber('');
    }
    let contactNameId = nanoid();
    let contactTelNumId = nanoid();
    return (
            <Form onSubmit={handleSubmitPhonebookForm}>
                <InputName htmlFor={contactNameId}> Name </InputName>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        id={contactNameId}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={handleChangeInput}
                    />
                <InputName htmlFor={contactTelNumId}>Tel.number</InputName>
                    <input
                        type="tel"
                        name="number"
                        value={number}
                        id={contactTelNumId}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={handleChangeInput}
                    />
                <Btn type="submit">Add</Btn>
            </Form>
        )
    }

