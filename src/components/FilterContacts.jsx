import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import { InputName } from './App/AppStyled';

export default function FilterContacts({ onFilter }) { 
    const filterId = nanoid();
    return (
        <div>
            <InputName htmlFor={filterId}>Find contacts by name</InputName>
            <input
                id={filterId}
                type="text"
                name="filter"
                onChange={onFilter}
            />
        </div>      
    )
}
    
FilterContacts.propTypes = {
    onFilter: PropTypes.func,
}