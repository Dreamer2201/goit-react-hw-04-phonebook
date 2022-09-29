import PropTypes from "prop-types";
import { ContactsList, ContactItem, DeleteContactBtn } from './ContactsStyled';

export default function Contacts({ items, deleteContact }) {
    const elements = items.map(({ id, name, number }) => {
        return  <ContactItem key={id}> {name}: +38{number}
                    <DeleteContactBtn type='button' onClick={() => deleteContact(id)}> Delete
                    </DeleteContactBtn>
                </ContactItem>
    })
    return (
            <ContactsList>
                {elements}
            </ContactsList>
    )
}

Contacts.propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })),
        deleteContact: PropTypes.func,
}