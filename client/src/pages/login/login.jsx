import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import '../../styles/login/login.css';
import MainHeader from '../../components/mainHeader';
import MainFooter from '../../components/mainFooter';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect, useContext } from 'react';
import {Context} from "../../App";
import { observer } from "mobx-react-lite";

 function LoginPage() {
  const {store} = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await store.login(username, password);
      if (store.user.role) {
        navigate(`/${store.user.role}`);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle login error if needed
    }
  };
  
  return (
    <>
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <div style={{ width: '100%' }}>
      <MainHeader/>
      </div>
        <div style={{
          flex: '1 0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
      <Container size={420} my={40}>
        <Title ta="center" className="title-login">
          Авторизация
        </Title>
        {/*<Text c="dimmed" size="sm" ta="center" mt={5}>
          Ещё нет аккаунта?{' '}
          <Anchor size="sm" component="button">
            Создать аккаунт
          </Anchor>
  </Text>*/}

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Логин" placeholder="login" name='username' required 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            />
            <PasswordInput label="Пароль" placeholder="Ваш пароль" name='password' required mt="md"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            />
            {/*<Group justify="space-between" mt="lg">
              <Checkbox label="Запомнить меня" name='remember'/>
              <Anchor component="button" size="sm">
                <Link to='/login/forgot'>
                  Забыли пароль?
                </Link>
              </Anchor>
</Group>*/}
            <Button fullWidth mt="xl" type='submit' onClick={handleLogin}>
              Вход
            </Button>
        </Paper>
      </Container>
      </div>
        <div style={{ width: '100%' }}>
      <MainFooter/>
      </div>
      </div>
    </>
  );
}


export default observer(LoginPage)