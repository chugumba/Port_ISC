import React, { useEffect } from 'react';

//Использование стора для управления пользователем
import { useContext } from 'react';
import { Context } from "../../App";
import { observer } from "mobx-react-lite";

import {Title} from '@mantine/core'
import { Link } from 'react-router-dom';

//Компоненты
import { UsersTable } from '../../components/auth/admin/UsersTable';
import AuthHeader from '../../components/auth/authHeader';
import MainFooter from "../../components/mainFooter";

//Навигация
const navItems = [

  //{label: "На главную", link: '/'}

]

function AdminPage() {
  const { store } = useContext(Context);

  return (
    <>
      
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh - 2.7em' }}>
        <AuthHeader navItems = {navItems}/>
        <h1 style={{textAlign: "center"}}>Управление пользователями</h1>
        <UsersTable />
      </div>
      <MainFooter/>
    </>
  );
}

export default observer(AdminPage);

