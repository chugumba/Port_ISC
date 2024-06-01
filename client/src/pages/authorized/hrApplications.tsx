import React, { useEffect } from 'react';
import { useContext } from 'react';
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

//Компоненты
import AuthHeader from "../../components/auth/authHeader.jsx";
import MainFooter from "../../components/mainFooter";
import Applications from '../../components/auth/hr/Applications.jsx';

//Навигация
const navItems = [

  {label: "Вакансии", link: '/hr'},
]


function HrApplications() {
  const { store } = useContext(Context);

  return (
    <>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh - 2.7em' }}>
        
        <AuthHeader navItems = {navItems}/>
        <Applications/>  
    
    </div>
     <MainFooter/>
    </>
);

};

export default observer(HrApplications);

