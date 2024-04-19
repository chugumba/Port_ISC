import React from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';

const ClientsPage = () => {
  return (
    <>
      <MainHeader/>
      
        <div>
          <h1>Клиентам</h1>
          <p>Здесь будет основной контент раздела.</p>
        </div>
      
      <MainFooter/>
    </>
  );
};

export default ClientsPage;