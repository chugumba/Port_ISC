import React from 'react';

//Компоненты
import { UsersTable } from '../../components/auth/admin/UsersTable';
import AuthHeader from '../../components/auth/authHeader';
import MainFooter from "../../components/mainFooter";

//Навигация
const navItems = []

function AdminPage() {

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
          <div>
        <h1 style={{textAlign: "center"}}>Управление пользователями</h1>
        <UsersTable />
        </div>
        </div>
        <div style={{ width: '100%' }}>
      <MainFooter/>
      </div>
      </div>
    </>
  );
}

export default AdminPage;

