import React from 'react';
// Компоненты
import AuthHeader from "../../components/auth/authHeader.jsx";
import MainFooter from "../../components/mainFooter.jsx";
import Departure from '../../components/auth/logistics/departureForm.tsx';

// Навигация
const navItems = [
  { label: "Прибытие", link: '/logistics' },
  { label: "Платформы", link: '/logistics/platforms' },
];

export default function DeparturePage() {
  return (
    <>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <div style={{ width: '100%' }}>
          <AuthHeader navItems={navItems} />
        </div>
        <div style={{
          flex: '1 0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Departure />
        </div>
        <div style={{ width: '100%' }}>
          <MainFooter />
        </div>
      </div>
    </>
  );
};
