import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

//Компоненты
import AuthHeader from "../../components/auth/authHeader.jsx";
import MainFooter from "../../components/mainFooter";
import HrVacancies from '../../components/auth/hr/hrVacancies'
//Навигация
const navItems = [

  {label: "На главную", link: '/'}

]


function HrPage() {
  const { store } = useContext(Context);

  return (
    <div>
      <AuthHeader navItems = {navItems}/>
      <HrVacancies/>
      <MainFooter/>
    </div>
  );

};

export default observer(HrPage);

