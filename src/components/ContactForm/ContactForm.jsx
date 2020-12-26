import React, { useState } from 'react';
import s from './ContactForm.module.css';

function ContactForm({ getContactData }) {
  // === State === //
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // ===
  // динамічно рендерить зміну полів інпутів
  const handleImputChange = e => {
    const { name, value } = e.currentTarget;

    // verify & set value to State
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  // виконується при Сабміті форми
  const onSubmitPress = e => {
    e.preventDefault();

    // результати полів прокидає в State Арр.js
    getContactData(name, number);

    resetFormField();
  };

  // очищає поля форми після Submit
  const resetFormField = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form onSubmit={onSubmitPress} className={s.form}>
        <fieldset className={s.fieldset}>
          <label className={s.label}>
            <span>name</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleImputChange}
              className={s.input}
            />
          </label>
          <label className={s.label}>
            <span>number</span>
            <input
              type="tel"
              name="number"
              value={number}
              onChange={handleImputChange}
              className={s.input}
            />
          </label>
          <button
            type="submit"
            className={s.button}
            disabled={!(name && number)}
          >
            <span>add contacts</span>
          </button>
        </fieldset>
      </form>
    </>
  );
}

export default ContactForm;

// class oldContactForm extends Component {
//   // state = {
//   //   name: '',
//   //   number: '',
//   // };

//   // // динамічно рендерить зміну полів інпутів
//   // handleImputChange = e => {
//   //   const { name, value } = e.currentTarget;
//   //   this.setState({ [name]: value });
//   // };

//   // // виконується при Сабміті форми
//   // onSubmitPress = e => {
//   //   e.preventDefault();

//   //   // результати полів прокидає в State Арр.js
//   //   this.props.getContactData(this.state);

//   //   this.resetFormField();
//   // };

//   // // очищає поля форми після Submit
//   // resetFormField = () => {
//   //   this.setState({ name: '', number: '' });
//   // };

//   render() {
//     const { name, number } = this.state;
//     const { onSubmitPress, handleImputChange } = this;

//     return (
//       <form onSubmit={onSubmitPress} className={s.form}>
//         <fieldset className={s.fieldset}>
//           <label className={s.label}>
//             <span>name</span>
//             <input
//               type="text"
//               name="name"
//               value={name}
//               onChange={handleImputChange}
//               className={s.input}
//             />
//           </label>
//           <label className={s.label}>
//             <span>number</span>
//             <input
//               type="tel"
//               name="number"
//               value={number}
//               onChange={handleImputChange}
//               className={s.input}
//             />
//           </label>
//           <button
//             type="submit"
//             className={s.button}
//             disabled={!(name && number)}
//           >
//             <span>add contacts</span>
//           </button>
//         </fieldset>
//       </form>
//     );
//   }
// }
