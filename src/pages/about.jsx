import React from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';

const AboutPage = () => {
  return (
    <>
      <MainHeader/>
      
        <div>
          <h1>Новая Страница</h1>
          <p>Это контент новой страницы.</p>
        </div>
      
      <MainFooter/>
    </>
  );
};

export default AboutPage;