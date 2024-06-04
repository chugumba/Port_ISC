import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Button, Container, Paper, Title, Space, NumberInput, Grid, Table, ScrollArea } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';

import { Logistics } from '../../../services/AuthorizedUsers';
import ContainerForm from './containerForm';

const ArrivalForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [arrivalId, setArrivalId] = useState(null);
  const [containers, setContainers] = useState([]);

  const form = useForm({
    initialValues: {
      name: '',
      flag: '',
      port_of_dep: '',
      crew: '',
      pier: '',
      date: null,
    },

    validate: {
      name: (value) => (value ? null : 'Наименование судна обязательно'),
      flag: (value) => (value ? null : 'Флаг судна обязателен'),
      port_of_dep: (value) => (value ? null : 'Порт отправления обязателен'),
      crew: (value) => (value > 0 ? null : 'Число членов экипажа должно быть больше 0'),
      pier: (value) => (value >= 1 && value <= 4 ? null : 'Причал должен быть от 1 до 4'),
      date: (value) => (value ? null : 'Дата прибытия обязательна'),
    },
  });

  const handleSubmit = async (values) => {
    try {

      const response = await Logistics.registerArrival(values.name, values.flag, values.port_of_dep, values.crew, values.pier, values.date);
      setIsSubmitted(true);
      setArrivalId(response.data.id);

    } catch (error) {
      console.log("Ошибка фиксации прибытия судна")
    }
  };

  const addContainer = (container) => {
    setContainers([...containers, container]);
  };

  const handleContainerSubmit = async () => {
    try {
     
      form.reset();
      setIsSubmitted(false);
      setArrivalId(null)
      setContainers([]);
      await Logistics.registerContainers(containers, arrivalId);
      
    } catch (error) {
      console.log("Ошибка фиксации прибытия контейнеров")
    }
    
  };

  return (
    <Container size="xl" my="xl">
      <Grid>
        <Grid.Col span={12}>
          <Paper shadow="md" p="lg">
            <Title order={2} align="center">Фиксация прибытия судна</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Space h="md" />
              <TextInput
                label="Наименование судна"
                placeholder="Судно"
                {...form.getInputProps('name')}
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <TextInput
                label="Флаг судна"
                placeholder="Флаг"
                {...form.getInputProps('flag')}
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <TextInput
                label="Порт отправления"
                placeholder="Порт"
                {...form.getInputProps('port_of_dep')}
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <TextInput
                label="Экипаж (чел.)"
                placeholder="Число членов экипажа"
                type="number"
                {...form.getInputProps('crew')}
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <NumberInput
                label="Причал прибытия"
                placeholder="Причал"
                {...form.getInputProps('pier')}
                min={1}
                max={4}
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <DateInput
                valueFormat="YYYY-MM-DD"
                label="Дата прибытия"
                placeholder="Дата"
                {...form.getInputProps('date')}
                required
                disabled={isSubmitted}
              />
              <Space h="lg" />
              {!arrivalId && (
                <Button type="submit" fullWidth>
                  Зафиксировать
                </Button>
              )}
            </form>
            {arrivalId && (
              <>
                <Space h="lg" />
                <ContainerForm addContainer={addContainer} />
                <Space h="lg" />
                {containers.length > 0 && (
                  <Button fullWidth onClick={handleContainerSubmit}>
                    Зафиксировать контейнеры
                  </Button>
                )}
              </>
            )}
          </Paper>
        </Grid.Col>
        <Grid.Col span={12}>
          {containers.length > 0 && (
            <Paper shadow="md" p="lg">
              <Title order={3} align="center">Записанные контейнеры</Title>
              <Table highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Платформа</Table.Th>
                    <Table.Th>Номер контейнера</Table.Th>
                    <Table.Th>Описание</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {containers.map((container, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>{container.platform}</Table.Td>
                      <Table.Td>{container.containerNumber}</Table.Td>
                      <Table.Td>{container.description}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Paper>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ArrivalForm;
