import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [nat, setNat] = useState('');
  const [deck, setDeck] = useState('');

  const [users, setUsers] = useState([]);

  // LocalStorage-dan foydalanuvchi ma'lumotlarini olish
  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  function handleChangeName(event) {
    setUsername(event.target.value);
  }
  function handleChangeAge(event) {
    setAge(event.target.value);
  }
  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }
  function handleChangeNat(event) {
    setNat(event.target.value);
  }
  function handleChangeDeck(event) {
    setDeck(event.target.value);
  }

  function handleSave(event) {
    event.preventDefault();
    const user = {
      username: username,
      age: age,
      email: email,
      nat: nat,
      deck: deck,
      id: Date.now(),
    };

    // Yangi foydalanuvchini qo'shish
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);

    // LocalStorage-ga saqlash
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Formani tozalash
    setUsername('');
    setAge('');
    setEmail('');
    setNat('');
    setDeck('');
  }

  return (
    <div className="container">
      <form className="form">
        <div className="Input">
          <label>Name</label>
          <input
            onChange={handleChangeName}
            value={username}
            type="text"
            placeholder="Enter name.."
          />
        </div>
        <div className="Input">
          <label>Age</label>
          <input
            onChange={handleChangeAge}
            value={age}
            type="number"
            placeholder="Enter age"
          />
        </div>
        <div className="Input">
          <label>Email</label>
          <input
            onChange={handleChangeEmail}
            value={email}
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div className="Input">
          <label>Nationality</label>
          <select onChange={handleChangeNat} value={nat}>
            <option value="uzbek">Uzbek</option>
            <option value="russian">Russian</option>
            <option value="english">English</option>
          </select>
        </div>
        <div className="Input">
          <label>Description</label>
          <textarea
            placeholder="Enter description"
            onChange={handleChangeDeck}
            value={deck}
          ></textarea>
        </div>
        <button className='handleSave' onClick={handleSave}>Save</button>
      </form>

      <div className="user-list">
        {users.map((user) => (
          <Card key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
