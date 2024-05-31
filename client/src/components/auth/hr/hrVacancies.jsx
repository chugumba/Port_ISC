import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Title, Text, Container, Group, ActionIcon, Paper, Grid, Button, SimpleGrid, Divider, Flex, TextInput } from '@mantine/core';
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { FaPhone, FaEdit, FaTrash } from "react-icons/fa";
import { useClipboard } from '@mantine/hooks';
import '../../../styles/vacancies.css';
import Contact from '../../../services/Unauth';

import { HR } from '../../../services/AuthorizedUsers';

export default function HrPage() {
  const matches = useMediaQuery('(min-width: 768px)');
  const clipboard = useClipboard();
  const [vacancies, setVacancies] = useState([]);
  const [editingVacancyId, setEditingVacancyId] = useState(null);
  
  const [vacancyBuf, setVacancyBuf] = useState({

  });

  async function fetchVacancies() {
    try {
      const response = await Contact.fetchVacancies();
      setVacancies(response.data);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    }
  }

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleEdit = (vacancy) => {
    if(editingVacancyId === null)
      { 
        setEditingVacancyId(vacancy.id)
        setVacancyBuf({ ...vacancy})
      }
    else {
        setEditingVacancyId(null);
        setVacancyBuf(null);
    }
  };

  const sendEdit = async () => {
    await HR.UpdateVacancy(vacancyBuf.id, vacancyBuf.title, vacancyBuf.description, vacancyBuf.requirements, vacancyBuf.benefits, vacancyBuf.contactEmail, vacancyBuf.contactPhone)

    setEditingVacancyId(null)
    setVacancyBuf(null)
    fetchVacancies();
  }

  const handleDelete = (id) => {
    HR.DeleteVacancy(id);
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
                    <Title order={3}>                      
                      {editingVacancyId === vacancy.id ? (
                        <TextInput defaultValue={vacancy.title} onChange={(event) => setVacancyBuf({ ...vacancyBuf, title: event.target.value })}/>
                      ) : (
                        vacancy.title
                      )}
                      </Title>
                    <Group>
                      <ActionIcon size="lg" color="blue" onClick={() => {handleEdit(vacancy)}}>
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
                  {editingVacancyId === vacancy.id ? (
                        <TextInput defaultValue={vacancy.description} onChange={(event) => setVacancyBuf({ ...vacancyBuf, description: event.target.value })}/>
                      ) : (
                        <Text size="sm" mb="sm">{vacancy.description}</Text>
                      )}
                  <Divider my="sm" />
                  <Group position="apart" mb="xs">
                    <Text size="sm" weight={500}>Требования:</Text>
                    <ActionIcon size="lg" color="gray" onClick={() => clipboard.copy(vacancy.requirements)}>
                      <CgFileDocument />
                    </ActionIcon>
                  </Group>
                  {editingVacancyId === vacancy.id ? (
                        <TextInput defaultValue={vacancy.requirements} onChange={(event) => setVacancyBuf({ ...vacancyBuf, requirements: event.target.value })}/>
                      ) : (
                        <Text size="sm" mb="sm">{vacancy.requirements}</Text>
                      )}
                  <Divider my="sm" />
                  <Group position="apart" mb="xs">
                    <Text size="sm" weight={500}>Мы предлагаем:</Text>
                    <ActionIcon size="lg" color="gray" onClick={() => clipboard.copy(vacancy.benefits)}>
                      <CgFileDocument />
                    </ActionIcon>
                  </Group>
                  {editingVacancyId === vacancy.id ? (
                        <TextInput defaultValue={vacancy.benefits} onChange={(event) => setVacancyBuf({ ...vacancyBuf, benefits: event.target.value })}/>
                      ) : (
                        <Text size="sm" mb="sm">{vacancy.benefits}</Text>
                      )}
                </div>
                <Divider my="sm" />
                <Grid>
                  <Grid.Col span={matches ? 6 : 12}>
                  {editingVacancyId === vacancy.id ? (
                        <TextInput defaultValue={vacancy.contactEmail} onChange={(event) => setVacancyBuf({ ...vacancyBuf, contactEmail: event.target.value })}/>
                      ) : (
                        
                    <Button
                      variant="outline"
                      fullWidth
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}
                      //onClick={() => window.location.href = `mailto:${vacancy.contactEmail}`}
                    >
                      <CiMail style={{ marginRight: 8 }} /> {vacancy.contactEmail}
                    </Button>
                    )}
                  </Grid.Col>
                  <Grid.Col span={matches ? 6 : 12}>
                  {editingVacancyId === vacancy.id ? (
                        <TextInput defaultValue={vacancy.contactPhone} onChange={(event) => setVacancyBuf({ ...vacancyBuf, contactPhone: event.target.value })}/>
                      ) : (
                    <Button
                      variant="outline"
                      fullWidth
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}
                      //onClick={() => window.location.href = `tel:${vacancy.contactPhone}`}
                    >
                      <FaPhone style={{ marginRight: 8 }} /> {vacancy.contactPhone}
                    </Button>
                      )}
                  </Grid.Col>
                </Grid>
                {editingVacancyId === vacancy.id ? (
                        <Button onClick={() => sendEdit(vacancy)}> Отправить </Button>
                      ) : (null)
                }
              </Flex>
              
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
