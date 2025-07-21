import React, { useState, useEffect } from 'react';
import api from '../api';

function UserSelector({ onUserSelected, refresh }) {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    api.get('/users').then(res => setUsers(res.data));
  }, [refresh]);

  // const addUser = async (e) => {
  //   e.preventDefault();
  //   await api.post('/users', { name: username });
  //   setUsername('');
  //   onUserSelected(null);
  // };

// In UserSelector.js or equivalent
const addUser = async (e) => {
  e.preventDefault();
  if (!username.trim()) {
    alert("Please enter a valid name!");
    return;
  }
  await api.post('/users', { name: username.trim() });
  setUsername('');
  onUserSelected(null);
};

  return (
    <div>
      <select onChange={e => onUserSelected(e.target.value)}>
        <option value="">Select User</option>
        {users.map(u => <option value={u._id} key={u._id}>{u.name}</option>)}
      </select>
      <form onSubmit={addUser}>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Add user..." />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default UserSelector;
