import React from 'react';
import MainHeader from '../../components/mainHeader';
import MainFooter from '../../components/mainFooter';

const AdminPage = () => {
  return (
    <>
      <MainHeader/>
      
        <div>
          <h1>Admin</h1>
          <p>Здесь будет основной контент раздела.</p>
        </div>
      
      <MainFooter/>
    </>
  );
};

export default AdminPage;