import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Title, Text, Container, Group, ActionIcon, Paper, Grid, Button, SimpleGrid, Divider, Flex } from '@mantine/core';
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { FaPhone, FaEdit, FaTrash } from "react-icons/fa";
import { useClipboard } from '@mantine/hooks';
import '../../../styles/vacancies.css';
import Contact from '../../../services/Unauth';

export default function HrPage() {
  const matches = useMediaQuery('(min-width: 768px)');
  const clipboard = useClipboard();
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    async function fetchVacancies() {
      try {
        const response = await Contact.fetchVacancies();
        setVacancies(response.data);
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      }
    }
    fetchVacancies();
  }, []);

  const handleEdit = (id) => {
    // Добавьте логику для редактирования вакансии
    console.log(`Edit vacancy with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Добавьте логику для удаления вакансии
    console.log(`Delete vacancy with id: ${id}`);
  };

  return (
    <>
      <Container size="lg" className="vacancies-page">
        <Title order={1} align="center" mt="xs" mb="md">Актуальные предложения</Title>
        <Text align="center" mb="xl">Присоединяйтесь к нашему коллективу.</Text>
        
        <SimpleGrid cols={matches ? 2 : 1} spacing="lg">
          {vacancies.map((vacancy, index) => (
            <Paper key={index} withBorder p="lg" radius="md">
              <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
                <div>
                  <Group position="apart" mb="xs">
                    <Title order={3}>{vacancy.title}</Title>
                    <Group>
                      <ActionIcon size="lg" color="blue" onClick={() => handleEdit(vacancy.id)}>
                        <FaEdit />
                      </ActionIcon>
                      <ActionIcon size="lg" color="red" onClick={() => handleDelete(vacancy.id)}>
                        <FaTrash />
                      </ActionIcon>
                      <ActionIcon size="lg" color="gray" onClick={() => clipboard.copy(`${vacancy.title}\n\n${vacancy.description}\n\nТребования:\n${vacancy.requirements}\n\nМы предлагаем:\n${vacancy.benefits}\n\nКонтактный Email: ${vacancy.contactEmail}\nКонтактный телефон: ${vacancy.contactPhone}`)}>
                        <TbDeviceDesktopAnalytics />
                      </ActionIcon>
                    </Group>
                  </Group>
                  <Divider my="sm" />
                  <Text size="sm" mb="sm">{vacancy.description}</Text>
                  <Divider my="sm" />
                  <Group position="apart" mb="xs">
                    <Text size="sm" weight={500}>Требования:</Text>
                    <ActionIcon size="lg" color="gray" onClick={() => clipboard.copy(vacancy.requirements)}>
                      <CgFileDocument />
                    </ActionIcon>
                  </Group>
                  <Text size="sm" mb="sm">{vacancy.requirements}</Text>
                  <Divider my="sm" />
                  <Group position="apart" mb="xs">
                    <Text size="sm" weight={500}>Мы предлагаем:</Text>
                    <ActionIcon size="lg" color="gray" onClick={() => clipboard.copy(vacancy.benefits)}>
                      <CgFileDocument />
                    </ActionIcon>
                  </Group>
                  <Text size="sm" mb="md">{vacancy.benefits}</Text>
                </div>
                <Divider my="sm" />
                <Grid>
                  <Grid.Col span={matches ? 6 : 12}>
                    <Button
                      variant="outline"
                      fullWidth
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}
                      onClick={() => window.location.href = `mailto:${vacancy.contactEmail}`}
                    >
                      <CiMail style={{ marginRight: 8 }} /> {vacancy.contactEmail}
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={matches ? 6 : 12}>
                    <Button
                      variant="outline"
                      fullWidth
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}
                      onClick={() => window.location.href = `tel:${vacancy.contactPhone}`}
                    >
                      <FaPhone style={{ marginRight: 8 }} /> {vacancy.contactPhone}
                    </Button>
                  </Grid.Col>
                </Grid>
              </Flex>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
