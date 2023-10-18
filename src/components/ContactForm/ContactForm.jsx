import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector  } from 'react-redux';
import { addContact } from 'redux/phonebookSlice';
import { nanoid } from 'nanoid';

import { getVissibleContacts } from 'redux/selectors';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ContactForm() {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getVissibleContacts);
  const dispatch = useDispatch();


  const handleSubmit = event => {
    event.preventDefault();
    const isInContacts = contacts.some(
      contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (isInContacts) {
      toast.info(`${name} is already in contacts`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    dispatch(addContact({ id: nanoid(), name, number }));
    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <ToastContainer transition={Slide} />
      <label className={css.form__label}>
        {'Name'}
        <input
          className={css.form__input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.form__label}>
        {'Number'}
        <input
          className={css.form__input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={css.submit__btn} type="submit">
        Add contact
      </button>
    </form>
  );
}