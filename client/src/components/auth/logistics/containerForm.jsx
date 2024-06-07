import React from 'react';
import { TextInput, Button, NumberInput, Space } from '@mantine/core';
import { useForm } from '@mantine/form';

const ContainerForm = ({ addContainer }) => {
  const containerForm = useForm({
    initialValues: {
      platform: '',
      containerNumber: '',
      description: '',
    },
    validate: {
      platform: (value) => (value < 1 || value > 4 ? 'Платформа должна быть от 1 до 4' : null),
      containerNumber: (value) => {
        if (value.length < 1) {
          return 'Номер контейнера обязателен';
        } else if (!/^[A-Za-z]{4}\d{7}$/.test(value)) {
          return 'Номер контейнера должен состоять из 4 букв и 7 цифр';
        }
        return null;
      },
    },
  });

  const handleSubmit = (values) => {
    addContainer(values);
    containerForm.reset();
  };

  return (
    <form onSubmit={containerForm.onSubmit(handleSubmit)}>
      <NumberInput
        label="Платформа"
        placeholder="Платформа"
        name="platform"
        value={containerForm.values.platform}
        onChange={(value) => containerForm.setFieldValue('platform', value)}
        min={1}
        max={4}
        error={containerForm.errors.platform}
      />
      <Space h="md" />
      <TextInput
        label="Номер контейнера"
        placeholder="Номер контейнера"
        name="containerNumber"
        value={containerForm.values.containerNumber}
        onChange={containerForm.getInputProps('containerNumber').onChange}
        error={containerForm.errors.containerNumber}
      />
      <Space h="md" />
      <TextInput
        label="Описание"
        placeholder="Описание"
        name="description"
        value={containerForm.values.description}
        onChange={containerForm.getInputProps('description').onChange}
      />
      <Space h="md" />
      <Button type="submit" fullWidth>
        Добавить контейнер
      </Button>
    </form>
  );
};

export default ContainerForm;
