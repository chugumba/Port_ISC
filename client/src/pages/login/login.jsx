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
import axios from 'axios';

export default function LoginPage() {

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const remember = formData.get('remember');

    try {
      const response = await axios.post('http://localhost:5000/login/login', {
        username,
        password,
        remember,
      });

      console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MainHeader/>
      <Container size={420} my={40}>
        <Title ta="center" className="title-login">
          Авторизация
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Ещё нет аккаунта?{' '}
          <Anchor size="sm" component="button">
            Создать аккаунт
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleLogin}>
            <TextInput label="Email" placeholder="you@mail.ru" name='username' required />
            <PasswordInput label="Пароль" placeholder="Ваш пароль" name='password' required mt="md"/>
            <Group justify="space-between" mt="lg">
              <Checkbox label="Запомнить меня" name='remember'/>
              <Anchor component="button" size="sm">
                <Link to='/login/forgot'>
                  Забыли пароль?
                </Link>
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type='submit'>
              Вход
            </Button>
          </form>
        </Paper>
      </Container>
      <MainFooter/>
    </>
  );
}