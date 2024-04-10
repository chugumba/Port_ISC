import React from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';

const AboutPage = () => {
  return (
    <>
      <MainHeader/>
      
        <div>
          <h1>О нас</h1>
          <p>Здесь будет основной контент раздела.</p>
        </div>
      
      <MainFooter/>
    </>
  );
};

export default AboutPage;