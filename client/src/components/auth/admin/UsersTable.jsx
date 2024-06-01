import { Badge, Table, Group, Text, ActionIcon, Anchor, rem, TextInput, Paper, Select } from '@mantine/core';
import { IconPencil, IconTrash, IconCheck } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';

// Добавить изменение пароля нормальное, подкелючить к бд
// изменение и удаление

// Попробовать сделать просто отправкой формы

import {Admin} from "../../../services/AuthorizedUsers"

const jobColors = {
  admin: 'blue',
  finances: 'lime',
  hr: 'pink',
  logistics: 'yellow',
  security: 'cyan',
};

export function UsersTable() {

  const [data, setData] = useState([])
  const [editingUserId, setEditingUserId] = useState(null);
  const [userBuf, setUserBuf] = useState([]);

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

  useEffect(() => {
    console.log(userBuf);
  }, [userBuf]);

  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        {item.id}
      </Table.Td>
      <Table.Td>
        <Group gap="sm">

        {editingUserId === item.id ? (
          <TextInput fz="sm"  defaultValue={item.username}
          onChange={(event) => setUserBuf({ ...userBuf, username: event.target.value })}
          />
          ) : (<Text fz="sm" >
            {item.username}
          </Text>)}
          
        </Group>
      </Table.Td>

      <Table.Td>
        
      {editingUserId === item.id ? ( 
      <Select data={["admin","hr","security","finances"]} 
      defaultValue={item.role}
      variant="unstyled"
      allowDeselect={false}
      onChange={(event) =>  setUserBuf({ ...userBuf, role: event })}
      />
      
    ) : (
       <Badge color={jobColors[item.role.toLowerCase()]} variant="light">
          {item.role}
        </Badge>
        )
      }
      </Table.Td>
      <Table.Td>
      {editingUserId === item.id ?
       ( 
        <TextInput fz="sm"  defaultValue={item.email} type="tel"
        onChange={(event) => setUserBuf({ ...userBuf, email: event.target.value })}
        />
        ):(
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      )}
      </Table.Td>
      <Table.Td>

      {editingUserId === item.id ?
       ( 
        <TextInput fz="sm"  defaultValue={item.phone} type="tel"
        onChange={(event) => setUserBuf({ ...userBuf, phone: event.target.value })}/>
        ):(
        <Text fz="sm">{item.phone}</Text>
        )}
        
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">
              {editingUserId === item.id && (
                <ActionIcon variant="subtle" color="blue">
                  <IconCheck style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
              )} 
          <ActionIcon variant="subtle" color="gray" onClick={() => 
              { 
                editingUserId === null ? (setEditingUserId(item.id), setUserBuf({...item}))
              : editingUserId === item.id ? (setEditingUserId(null))
              : setEditingUserId(item.id) 
              }
            }>
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5}/>
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper style={{margin: "30px"}}>
    <Table.ScrollContainer minWidth={400}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Username</Table.Th>
            <Table.Th>Роль</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Номер</Table.Th>
            {editingUserId && (
              <Table.Th>Пароль</Table.Th>
            )}
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
    </Paper>
  );
}