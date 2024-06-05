import React from 'react';
import { observer } from "mobx-react-lite";

//Компоненты
import AuthHeader from "../../components/auth/authHeader.jsx";
import MainFooter from "../../components/mainFooter";
import Arrival from '../../components/auth/logistics/arivalForm.jsx'
//Навигация
const navItems = [

  {label: "Платформы", link: '/logistics/platforms'},
  {label: "Убытие", link: '/logistics/departure'},

]


function LogisticsPage() {

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
        <Arrival/>
        </div>
        <div style={{ width: '100%' }}>

      <MainFooter/>
      </div>
      </div>
    </>
  );

};

export default observer(LogisticsPage);

