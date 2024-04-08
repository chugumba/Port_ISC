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

export default function LoginPage() {

  return (
    <>
      <MainHeader/>
      <Container size={420} my={40}>
        <Title ta="center" className="title">
          Авторизация
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Ещё нет аккаунта?{' '}
          <Anchor size="sm" component="button">
            Создать аккаунт
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mail.ru" required />
          <PasswordInput label="Пароль" placeholder="Ваш пароль" required mt="md" />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Запомнить меня" />
            <Anchor component="button" size="sm">
              <Link to='/login/forgot'>
                Забыли пароль?
              </Link>
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Вход
          </Button>
        </Paper>
      </Container>
      <MainFooter/>
    </>
  );
}