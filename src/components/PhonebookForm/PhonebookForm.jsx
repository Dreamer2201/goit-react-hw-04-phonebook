import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form, Btn } from './PhonebookFormStyled';
import { InputName } from '../App/AppStyled';

export default class PhonebookForm extends Component {
    state = {
        name: '',
        number: ''
    };
    
    handleChangeInput= (e) => {
        const { name, value } = e.target; 
        this.setState({
            [name]: value,
        })
    }
    handleSubmitPhonebookForm = (e) => {
        e.preventDefault();
        this.props.onAddContact(this.state);
        this.setState({
            name: '',
            number: ''
        })
    }
    contactNameId = nanoid();
    contactTelNumId = nanoid();
    render() {
        const { handleSubmitPhonebookForm, handleChangeInput, contactNameId, contactTelNumId } = this;
        return (
            <Form onSubmit={handleSubmitPhonebookForm}>
                <InputName htmlFor={contactNameId}> Name </InputName>
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
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
                        value={this.state.number}
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
}
