import React, { useEffect, useState } from 'react';
import { Table, Paper, SimpleGrid, Title, Button, Select } from '@mantine/core';
import { Logistics } from '../../../services/AuthorizedUsers';
import { BsDashLg } from "react-icons/bs";

const Platform = () => {
  const [platforms, setPlatforms] = useState([]);
  const [containers, setContainers] = useState([]);

  const fetchData = async () => {
    try {
      const platformsData = await Logistics.platformsGet();
      const containersData = await Logistics.containersGet();
      setPlatforms(platformsData);
      setContainers(containersData); 
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const moveContainer = async (containerId, newPlatId) => {
    try {
        
        await Logistics.containersMove(containerId, newPlatId);
        fetchData();

    } catch (error) {
        console.error('Ошибка при загрузке данных', error);
    }
  };

  return (
    <>
      <SimpleGrid m={30} cols={2} verticalSpacing="sm">
        {platforms.map((platform) => {
          const platformContainers = containers.filter((container) => container.plat_id === platform.id);

          return (
            <Paper key={platform.id}>
              <Title align="center" mb={10} order={3}>
                Платформа: {platform.id}: {platform.fill}/{platform.capacity}
              </Title>
              <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Номер</Table.Th>
                    <Table.Th>Описание</Table.Th>
                    <Table.Th>Действие</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {platformContainers.length > 0 ? (
                    platformContainers.map((container) => (
                      <Table.Tr key={container.id}>
                        <Table.Td>{container.name}</Table.Td>
                        <Table.Td>{container.desc === '' ? <BsDashLg /> : container.desc}</Table.Td>
                        <Table.Td>
                          <Select
                            placeholder="Переместить на..."
                            data={platforms.filter(p => p.id !== platform.id).map(p => ({ value: p.id.toString(), label: `Платформа ${p.id}` }))}
                            onChange={(value) => moveContainer(container.id, parseInt(value))}
                          />
                        </Table.Td>
                      </Table.Tr>
                    ))
                  ) : (
                    <Table.Tr>
                      <Table.Td colSpan={3} align="center">
                        Нет записей о контейнерах
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </Paper>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default Platform;
