import { Badge, Table, Group, Text, ActionIcon, Anchor, rem, TextInput, Paper, Select, Button } from '@mantine/core';
import { IconPencil, IconTrash, IconCheck } from '@tabler/icons-react';
import React, { useState, useEffect, useContext } from 'react';
import validator from 'validator';
import {Context} from "../../../App";

import {Admin} from "../../../services/AuthorizedUsers"

//Да, это плохо написано, у меня не было времени

const jobColors = {
  admin: 'blue',
  finances: 'lime',
  hr: 'pink',
  logistics: 'yellow',
  security: 'cyan',
};

export function UsersTable() {
  
  const {store} = useContext(Context);
  const [data, setData] = useState([])
  const [editingUserId, setEditingUserId] = useState(null);
  const [userBuf, setUserBuf] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  async function getUsers() {
    try {
      const response = await Admin.fetchUsers();
      setData(response.data);
    } catch (error) {
      console.error('Не удалось запросить пользователей:', error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);


  async function handleSendChanges() {

    if (!userBuf.username || !userBuf.password || !userBuf.role || !userBuf.phone || !userBuf.email) {
      alert('Все поля должны быть заполнены');
      return;
    }

    if (userBuf.phone && !validator.isMobilePhone(userBuf.phone, 'any', { strictMode: false })) {
      alert('Некорректный номер телефона')
      return;
    }

    if (userBuf.email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userBuf.email)) {
      alert('Некорректный email')
      return;
    }

    if(!userBuf.id)
      {
        try {
        await Admin.registerUser(userBuf.username, userBuf.password, userBuf.role, userBuf.phone, userBuf.email)
        setEditingUserId(null)
        getUsers()
        setIsFormVisible(false)
      } catch (error) {
        alert('Не удалось добавить пользователя:', error);
      } 
      }else{
        try {
          await Admin.editUser(userBuf.id, userBuf.username, userBuf.password, userBuf.role, userBuf.phone, userBuf.email);
          setEditingUserId(null)
          getUsers()
          setIsFormVisible(false)
        } catch (error) {
          alert('Не удалось обновить пользователя:', error);
        } 
    }
  }

  async function handleDeleteChanges(id) {

    try {
      await Admin.deleteUser(id);
      setEditingUserId(null)
      getUsers()
    } catch (error) {
      alert('Не удалось удалить пользователя:', error);
    }

  }

  const rows = data.map((item) => (
    item.id !== store.user.id && (
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
        <TextInput fz="sm"  defaultValue={item.phone}
        onChange={(event) => setUserBuf({ ...userBuf, phone: event.target.value })}/>
        ):(
        <Text fz="sm">{item.phone}</Text>
        )}
        
      </Table.Td>

      <Table.Td>
      {editingUserId === item.id ?
       ( 
        <TextInput fz="sm" 
        onChange={(event) => setUserBuf({ ...userBuf, password: event.target.value })}/>
        ):(
        <Text fz="sm">Скрыто</Text>
        )}
      </Table.Td>

      <Table.Td>
        <Group gap={0} justify="flex-end">

              {editingUserId === item.id && (
                <ActionIcon variant="subtle" color="blue"  onClick={() => handleSendChanges()}>
                  <IconCheck style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
              )} 

          <ActionIcon variant="subtle" color="gray" onClick={() => 
              { 
                editingUserId === null ? (setEditingUserId(item.id), setUserBuf({...item, password: null}))
              : editingUserId === item.id ? (setEditingUserId(null))
              : setEditingUserId(item.id) 
              setIsFormVisible(false)
            } 
            }>
            <IconPencil style={{ width: rem(16), height: rem(16) }} stroke={1.5}/>
          </ActionIcon>
            
          <ActionIcon variant="subtle" color="red" onClick={() => handleDeleteChanges(item.id)}>
            <IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>

        </Group>
      </Table.Td>
    </Table.Tr>)
  ));

  return (
  <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
    <Paper style={{ margin: "30px" }}>
      <Table.ScrollContainer minWidth={400}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Username</Table.Th>
              <Table.Th>Роль</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Номер</Table.Th>
              <Table.Th>Пароль</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Paper>
    {!isFormVisible && (
      <Button fullWidth mb={20} mt={20} onClick={() => {setIsFormVisible(true); setUserBuf(null); setEditingUserId(null)}}>
        Добавить запись
      </Button>
    )}
    {isFormVisible && (

      <Paper mb={20} mt={20} p ={20}>
       
        Username: <TextInput fz="sm" onChange={(event) => setUserBuf({ ...userBuf, username: event.target.value })} />
        Роль: <Select data={["admin","hr","security","finances"]} 
              
              
              allowDeselect={false}
              onChange={(event) =>  setUserBuf({ ...userBuf, role: event })}
            />
        Email: <TextInput fz="sm" onChange={(event) => setUserBuf({ ...userBuf, email: event.target.value })} />
        Номер телефона: <TextInput fz="sm" onChange={(event) => setUserBuf({ ...userBuf, phone: event.target.value })}/>
        Пароль: <TextInput fz="sm" onChange={(event) => setUserBuf({ ...userBuf, password: event.target.value })} />
        
        <Button fullWidth mb={20} mt={20} onClick={()=>{handleSendChanges();}}>
        Зарегистрировать
        </Button>
        <Button fullWidth  mt={20} onClick={() => {setIsFormVisible(false);}}>
        Отмена
        </Button>

      </Paper>
    )}
  </div>

  );
}