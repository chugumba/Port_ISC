import React from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import { ClientsFAQ } from '../components/ClientsFAQ';

const ClientsPage = () => {
  return (
    <>
      <MainHeader/>
      
        <ClientsFAQ/>
      
      <MainFooter/>
    </>
  );
};

export default ClientsPage;