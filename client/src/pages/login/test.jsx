//Эта страница для тестов


import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestPage() {
  const [accountants, setAccountants] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/getDB');
        setAccountants(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Accountants List</h1>
      <ul>
        {accountants.map(accountant => (
          <li key={accountant.id}>
            {accountant.username} ({accountant.email}) {accountant.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestPage;
