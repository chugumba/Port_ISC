import React, { useState, useEffect } from 'react';
import { Table, Checkbox, Paper, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Logistics } from '../../../services/AuthorizedUsers';

export default function Departure() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [elements, setElements] = useState<{ id: number, arr_id: number, plat_id: number, name: string, desc: string | null }[]>([]);

  const form = useForm({
    initialValues: {
      given: ''
    },
    validate: {
      given: (value) => (value ? null : 'Нужно указать кому передан груз'),
    },
  });

  const fetchData = async () => {
    try {
      const data = await Logistics.containersGet();
      setElements(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values: { given: string }) => {
    try {
      await Logistics.addDeparture(selectedRows, values.given);
      form.reset();
      setSelectedRows([]);
      fetchData();

    } catch (error) {
      console.error('Ошибка при отправке данных', error);
    }
  };

  const rows = elements.map((element) => (
    <Table.Tr
      key={element.id}
      bg={selectedRows.includes(element.id) ? 'var(--mantine-color-blue-light)' : 'var(--mantine-color-gray-0)'}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.id]
                : selectedRows.filter((id) => id !== element.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.arr_id}</Table.Td>
      <Table.Td>{element.plat_id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.desc === '' ? <i>Описание отсутствует</i> : element.desc}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table bg='var(--mantine-color-gray-0)' mt={20} mb={10}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>ID</Table.Th>
            <Table.Th>ID Прибытия</Table.Th>
            <Table.Th>ID Платформы</Table.Th>
            <Table.Th>Номер контейнера</Table.Th>
            <Table.Th>Описание</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {selectedRows.length !== 0 && (
        <Paper mt={20} p={20} mb={20} withBorder>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label='Передано: ' withAsterisk {...form.getInputProps('given')} placeholder='Контейнер(-ы) передан(-ы):' mb={10} />
            <Button type='submit' fullWidth> Отправить контейнеры </Button>
          </form>
        </Paper>
      )}
    </>
  );
}
