import React from 'react';
//Компоненты
import AuthHeader from "../../components/auth/authHeader.jsx";
import MainFooter from "../../components/mainFooter.jsx";

//Навигация
const navItems = [

  {label: "Прибытие", link: '/logistics'},
  {label: "Платформы", link: '/logistics/platforms'},
]


export default function DeparturePage() {

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh - 2.7em' }}>
        <AuthHeader navItems = {navItems}/>
        
      </div>
      <MainFooter/>
    </>
  );

};