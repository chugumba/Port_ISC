import { Avatar, Badge, Table, Group, Text, ActionIcon, Anchor, rem, Container, Paper } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';

//получает данные о пользователях
import {Admin} from "../../../services/AuthorizedUsers"

/* 

Нужно сделать, чтобы данные получались из БД, добавить возможность редактировать полтьзователя и удалять его.
Добавить возможность изменить пароль (?)

Сделать страницу добавления пользователей.


*/



const jobColors = {
  admin: 'blue',
  finances: 'lime',
  hr: 'pink',
  logistics: 'yellow',
  security: 'cyan',
};

export function UsersTable() {

  const [data, setData] = useState([])

  async function getUsers() {
    try {
      const response = await Admin.fetchUsers();
      console.log(response)
      setData(response.data);
    } catch (error) {
      console.error('Не удалось запросить вакансии:', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Text fz="sm" fw={500}>
            {item.username}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
      {item.role && (
        <Badge color={jobColors[item.role.toLowerCase()]} variant="light">
          {item.role}
        </Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.phone}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper>
    <Table.ScrollContainer minWidth={400}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Username</Table.Th>
            <Table.Th>Роль</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Номер</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
    </Paper>
  );
}