import {
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
    rem,
  } from '@mantine/core';
  import '../../styles/login/forgotPass.css';
 import { FaArrowLeft } from "react-icons/fa";
 import { Link } from 'react-router-dom';
  
  export default function ForgotPassword() {
    return (
      <Container size={460} my={30}>
        <Title className="title" ta="center">
          Забыли пароль?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Введите свой email чтобы администратор с вами связался
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Ваш email" placeholder="me@mail.ru" required />
          <Group justify="space-between" mt="lg" className="control">
            <Anchor c="dimmed" size="sm" className="control">
              <Center inline>
                <FaArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Link to='/login' >
                <Box ml={5}>Вернуться к странице Авторизации</Box>
                </Link>
              </Center>
            </Anchor>
            <Button className="control">Восстановить пароль</Button>
          </Group>
        </Paper>
      </Container>
    );
  }