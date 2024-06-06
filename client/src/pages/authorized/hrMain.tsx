import React from 'react';

//Компоненты
import AuthHeader from "../../components/auth/authHeader.jsx";
import MainFooter from "../../components/mainFooter";
import HrVacancies from '../../components/auth/hr/hrVacancies'

//Навигация
const navItems = [

  {label: "Заявки", link: '/hr/applications'},
]


function HrPage() {

  return (
    <>
       <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <div style={{ width: '100%' }}>
        <AuthHeader navItems = {navItems}/>
        </div>
        <div style={{
          flex: '1 0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <HrVacancies/>
        </div>
        <div style={{ width: '100%' }}>
      <MainFooter/>
      </div>
      </div>
    </>
  );

};

export default HrPage;

