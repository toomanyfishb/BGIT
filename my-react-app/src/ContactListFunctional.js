import React, { useState } from 'react';

const ContactListFunctional = () => {
    const [contacts, setContacts] = useState([
        { id: 1, name: 'John Doe', phone: '07252690325' },
        { id: 2, name: 'Jane Smith', phone: '07363701436' }
    ]);
    const [newContactName, setNewContactName] = useState('');
    const [newContactPhone, setNewContactPhone] = useState('');

    const handleNameChange = (e) => {
        setNewContactName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setNewContactPhone(e.target.value);
    };

    const handleAddContact = () => {
        if (newContactName && newContactPhone) {
            const newContact = {
                id: Date.now(),
                name: newContactName,
                phone: newContactPhone
            };
            setContacts([...contacts, newContact]);
            setNewContactName('');
            setNewContactPhone('');
        }
    };
    const handleRemoveContact = (id) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    return (
        <div>
            <h2>Contact List</h2>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        {contact.name} - {contact.phone}{' '}
                        <button onClick={ () => handleRemoveContact(contact.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <h2>Add New Contact</h2>
            <input
                type='text'
                placeholder='Name'
                value={newContactName}
                onChange={handleNameChange}
            />
            <input
                type='text'
                placeholder='Phone'
                value={newContactPhone}
                onChange={handlePhoneChange}
            />
            <button onClick={handleAddContact}>Add Contact</button> 
        </div>
    );
};

export default ContactListFunctional;