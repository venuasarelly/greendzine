import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>User List</h1>
      <input type="text" placeholder="Search by first name" value={searchTerm} onChange={handleSearch} />
      {filteredUsers.map((user) => (
        <div key={user.id}>
          <img src={user.avatar} alt={user.first_name} />
          <p>ID: {user.id}</p>
          <p>First Name: {user.first_name}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
