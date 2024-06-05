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
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh - 2.7em' }}>
        <AuthHeader navItems = {navItems}/>
        <Arrival/>
      </div>
      <MainFooter/>
    </>
  );

};

export default observer(LogisticsPage);

