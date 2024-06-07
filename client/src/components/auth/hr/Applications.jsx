import { useState, useEffect } from 'react';
import { Badge, Table, Text, Select } from '@mantine/core';
import { HR } from '../../../services/AuthorizedUsers';
import { BsDashLg } from "react-icons/bs";

const rolesData = ['Ожидает ответа', 'Завершено', 'Отклонено', 'В работе'];

export default function Application() {

  const [data, setData] = useState([]);

  async function fetchApplications (){
    try {
      const response = await HR.getApplications();
      setData(response.data);
    }catch (error){
      console.error('Не удалось запросить заявки')
    }
  } 

  useEffect( () => {
    fetchApplications()
  },[])

  async function updateStatus(status, id) {

    await HR.updateStatus(status, id)
    fetchApplications();

  }

  const rows = data.map((item) => (
    <Table.Tr key={item.id}>

      <Table.Td>
        {item.id}
      </Table.Td>

      <Table.Td>
        {item.name}
      </Table.Td>

      <Table.Td>
      {(item.email !== null && item.email !== '') ? item.email : <BsDashLg />}
      </Table.Td>

      <Table.Td textAlign="center"> 
        {(item.phone_number !== null && item.phone_number !== '') ? item.phone_number : <BsDashLg />}
      </Table.Td>
      
      <Table.Td>
      <Text >
      {(item.message !== null && item.message !== '') ? item.message : <BsDashLg />}
      </Text>
      </Table.Td>
      <Table.Td style={{ maxWidth: '100px' }}>

      <Badge 
        color={
          item.status === 'Ожидает ответа'
            ? 'orange'
            : item.status === 'Завершено'
            ? 'green'
            : item.status === 'Отклонено'
            ? 'red'
            : item.status === 'В работе'
            ? 'yellow'
            : null
          }
          
    fullWidth >
      <Select
          data={rolesData}
          defaultValue={item.status}
          variant="unstyled"
          allowDeselect={false}
          onChange={(selectedStatus) => updateStatus(selectedStatus, item.id)}
        />
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={400} >
      <Table verticalSpacing="sm" withColumnBorders >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Телефон</Table.Th>
            <Table.Th>Сообщение</Table.Th>
            <Table.Th>Статус</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody >{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}