import { Avatar, Badge, Table, Group, Text, ActionIcon, Anchor, rem, Container, Paper } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import React from 'react';

//получает данные о пользователях
import getUsers from "../../../services/UserService"

/* 

Нужно сделать, чтобы данные получались из БД, добавить возможность редактировать полтьзователя и удалять его.
Добавить возможность изменить пароль (?)

Сделать страницу добавления пользователей.


*/

const data = [
  {
    name: 'Robert Wolfkisser',
    job: 'admin',
    email: 'rob_wolf@gmail.com',
    phone: '+44 (452) 886 09 12',
  },
  {
    name: 'Jill Jailbreaker',
    job: 'finances',
    email: 'jj@breaker.com',
    phone: '+44 (934) 777 12 76',
  },
  {
    name: 'Henry Silkeater',
    job: 'hr',
    email: 'henry@silkeater.io',
    phone: '+44 (901) 384 88 34',
  },
  {
    name: 'Bill Horsefighter',
    job: 'logistics',
    email: 'bhorsefighter@gmail.com',
    phone: '+44 (667) 341 45 22',
  },
  {
    name: 'Jeremy Footviewer',
    job: 'security',
    email: 'jeremy@foot.dev',
    phone: '+44 (881) 245 65 65',
  },
];

const jobColors: Record<string, string> = {
  admin: 'blue',
  finances: 'lime',
  hr: 'pink',
  logistics: 'yellow',
  security: 'cyan',
};

export function UsersTable() {
  const rows = data.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={jobColors[item.job.toLowerCase()]} variant="light">
          {item.job}
        </Badge>
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
    <Table.ScrollContainer minWidth={800}>
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