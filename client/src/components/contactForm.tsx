import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

export function GetInTouchSimple() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,

        email: (value) => {
          // Если email пустой, но телефон заполнен, валидация не требуется
          if (!value && form.values.phone) return null;
      
          // Если email заполнен, проверяем его на соответствие паттерну
          if (value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
            return 'Некорректный email';
          }
      
          // Если оба поля пустые, требуется заполнить хотя бы одно из них
          if (!value && !form.values.phone) {
            return 'Email или номер телефона обязателен к заполнению';
          }
      
          return null; // Если нет ошибок, возвращаем null
        },
        phone: (value) => {
          // Если номер телефона пустой, но email заполнен, валидация не требуется
          if (!value && form.values.email) return null;
      
          // Если номер телефона заполнен, проверяем его на соответствие паттерну
          if (value && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value)) {
            return 'Некорректный номер телефона';
          }
      
          // Если оба поля пустые, требуется заполнить хотя бы одно из них
          if (!value && !form.values.email) {
            return 'Email или номер телефона обязателен к заполнению';
          }
      
          return null; // Если нет ошибок, возвращаем null
        },
      },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={900}
        ta="center"
      >
        Свяжитесь с нами
      </Title>
    <Text ta="center">
        Ответим в течении 2-ух рабочих дней
    </Text>
      <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
        <TextInput
         withAsterisk
          label="Имя"
          placeholder="Ваше имя"
          name="name"
          variant="filled"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          placeholder="Ваш email"
          name="email"
          variant="filled"
          {...form.getInputProps('email')}
        />
      </SimpleGrid>

      <TextInput
        label="Номер"
        placeholder="Ваш номер"
        mt="md"
        name="phone"
        variant="filled"
        {...form.getInputProps('phone')}
      />
      <Textarea
        mt="md"
        label="Сообщение"
        placeholder="Дополнительная информация"
        maxRows={10}
        minRows={5}
        autosize
        name="message"
        variant="filled"
        {...form.getInputProps('message')}
      />

      <Group justify="center" mt="xl">
        <Button type="submit" size="md">
          Отправить
        </Button>
      </Group>
    </form>
  );
}