// export const contacts = state => state.phonebook.contacts.items;
// export const filter = state => state.phonebook.contacts.filter;
import { createSelector } from 'reselect';
export const contacts = state => state.phonebook.contacts.items;

export const filter = state => state.phonebook.contacts.filter;

export const getVissibleContacts = createSelector(
  [contacts, filter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
);