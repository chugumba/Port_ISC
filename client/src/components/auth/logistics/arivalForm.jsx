import React, { useEffect, useState } from 'react';
import { TextInput, Button, Container, Paper, Title, Space, NumberInput, Grid, Table } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';

import { Logistics } from '../../../services/AuthorizedUsers';
import ContainerForm from './containerForm';

const ArrivalForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [arrivalId, setArrivalId] = useState(null);
  const [containers, setContainers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      flag: e.target.flag.value,
      port_of_dep: e.target.port_of_dep.value,
      crew: e.target.crew.value,
      pier: e.target.pier.value,
      date: e.target.date.value,
    };
    console.log(formData);
    setIsSubmitted(true);
    const response = await Logistics.registerArrival(formData.name, formData.flag, formData.port_of_dep, formData.crew, formData.pier, formData.date);
    setArrivalId(response.data.id);
  };

  const addContainer = (container) => {
    setContainers([...containers, container]);
  };

  const handleContainerSubmit = async () => {
    
    await Logistics.registerContainers(containers, arrivalId)

  };

  return (
    <Container size="xl" my="xl">
      <Grid>
        <Grid.Col span={12}>
          <Paper shadow="md" p="lg">
            <Title order={2} align="center">Фиксация прибытия судна</Title>
            <form onSubmit={handleSubmit}>
              <Space h="md" />
              <TextInput
                label="Наименование судна"
                placeholder="Судно"
                name="name"
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <TextInput
                label="Флаг судна"
                placeholder="Флаг"
                name="flag"
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <TextInput
                label="Порт отправления"
                placeholder="Порт"
                name="port_of_dep"
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <TextInput
                label="Экипаж (чел.)"
                placeholder="Число членов экипажа"
                name="crew"
                type="number"
                required
                disabled={isSubmitted}
              />
              <Space h="md" />
              <NumberInput
                label="Причал прибытия"
                placeholder="Причал"
                name="pier"
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
                name="date"
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
