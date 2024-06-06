import React from 'react';
import { Title } from '@mantine/core';
// Компоненты
import AuthHeader from "../../components/auth/authHeader.jsx";
import MainFooter from "../../components/mainFooter.jsx";
import ArrivalsTable from '../../components/auth/logistics/arrivalsTable.jsx';
// Навигация
const navItems = [
  { label: "Прибытие", link: '/logistics' },
  {label: "Убытие", link: '/logistics/departure'},
  { label: "Платформы", link: '/logistics/platforms' },
];

export default function Documents() {
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
          <div>
          <Title order={1} align="center" mt="xs" mb="md">Нажмите на запись чтобы создать отчёт</Title>
          <Title order={3} align="center" mt="xs" mb="md">Прибытия</Title>
          <ArrivalsTable/>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <MainFooter />
        </div>
      </div>
    </>
  );
};
