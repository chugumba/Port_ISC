import React, { useState } from 'react';
import { TextInput, Textarea, SimpleGrid, Group, Title, Button, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import contact from "../services/Unauth";
import validator from 'validator';

export function GetInTouchSimple() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2 ? 'Имя должно содержать как минимум 2 символа' : null,
      email: (value) => {
        if (!value && form.values.phone) return null;
        if (value && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          return 'Некорректный email';
        }
        if (!value && !form.values.phone) {
          return 'Email или номер телефона обязателен к заполнению';
        }
        return null;
      },
      phone: (value) => {
        if (!value && form.values.email) return null;
        if (value && !validator.isMobilePhone(value, 'any', { strictMode: false })) {
          return 'Некорректный номер телефона';
        }
        if (!value && !form.values.email) {
          return 'Email или номер телефона обязателен к заполнению';
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values) => {
    try {
      await contact.send(values.name, values.email, values.phone, values.message);
      setIsSubmitted(true); 
      setErrorMessage(''); 
    } catch (error) {
      setIsSubmitted(false); 
      setErrorMessage('Произошла ошибка при отправке формы. Пожалуйста, попробуйте снова.'); 
    }
  };

  if (isSubmitted && !errorMessage) {
    return <Text ta="center">Спасибо, наш специалист скоро с вами свяжется</Text>;
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}> 
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
      {errorMessage}
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
