import React, { useEffect, useState } from 'react';
import MainHeader from '../../components/mainHeader';
import MainFooter from '../../components/mainFooter';
import axios from 'axios';

const AdminPage = () => {

  const [data, setData] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();

    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tables');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables: ', error);
      }
    };

    fetchTables();
  }, []);
  

  return (
    <>
      <MainHeader/>
      
        <div>
          {data ? <p>{data}</p> : <p>Loading...</p>}
        </div>

        <div>
      {tables.length > 0 ? (
        <ul>
          {tables.map((table, index) => (
            <li key={index}>{table}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
      
      <MainFooter/>
    </>
  );
};

export default AdminPage;