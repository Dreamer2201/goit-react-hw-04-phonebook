import styled from 'styled-components';

const ContactsList = styled.ol`
    font-size: 24px;
`;
const ContactItem = styled.li`
    display: flex;
    align-items: center;
`;

const DeleteContactBtn = styled.button`
    margin-left: 15px;
`;

export { ContactsList, ContactItem, DeleteContactBtn };