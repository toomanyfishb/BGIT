import React, { Component } from 'react';
   
class ContactListClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [
                { id: 1, name: 'John Doe', phone: '07252690325'},
                { id: 2, name: 'Jane Smith', phone: '07363701436'}
            ],
            newContactName: '',
            newContactPhone: ''
        };
    }

    handleNameChange = (e) => {
        this.setState({ newContactName: e.target.value });
    };

    handlePhoneChange = (e) => {
        this.setState({ newContactPhone: e.target.value });
    };
    
    handleAddContact = () => {
        const { newContactName, newContactPhone } = this.state;
        if (newContactName && newContactPhone) {
            const newContact = {
                id: Date.now(),
                name: newContactName,
                phone: newContactPhone
            };
            this.setState((prevState) => ({
                contacts: [...prevState.contacts, newContact],
                newContactName: '',
                newContactPhone: ''
            }));
        }
    };

    handleRemoveContact = (id) => {
        this.setState((prevState) => ({
            contacts: prevState.contacts.filter((contact) => contact.id !== id)
        }));
    };

    render() {
        const { contacts, newContactName, newContactPhone } = this.state;

        return (
            <div>
                <h2>Contact List</h2>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            {contact.name} - {contact.phone}{' '}
                            <button onClick={ () => this.handleRemoveContact(contact.id) }>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <h2>Add New Contact</h2>
                <input 
                    type="text"
                    placeholder="Name"
                    value={newContactName}
                    onChange={this.handleNameChange}
                />
                <input 
                    type="text"
                    placeholder="Phone"
                    value={newContactPhone}
                    onChange={this.handlePhoneChange}
                />
                <button onClick={this.handleAddContact}>Add Contact</button>
            </div>
        );
    }
}


export default ContactListClass

