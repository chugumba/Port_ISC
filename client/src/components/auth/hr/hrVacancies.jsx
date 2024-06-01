import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Title, Text, Container, Group, ActionIcon, Paper, Grid, Button, SimpleGrid, Divider, Flex, Textarea } from '@mantine/core';
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
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [vacancyBuf, setVacancyBuf] = useState(null);

  // Выводит все существующие записи
  async function fetchVacancies() {
    try {
      const response = await Contact.fetchVacancies();
      setVacancies(response.data);
    } catch (error) {
      console.error('Не удалось запросить вакансии:', error);
    }
  }

  // Запрашивает записи при открытии/обновлении
  useEffect(() => {
    fetchVacancies();
  }, []);

// Управляет изменением записи
  const handleEdit = (vacancy) => {

    if(editingVacancyId === null)
      { 
        setEditingVacancyId(vacancy.id)
        setVacancyBuf({ ...vacancy})
        setIsFormVisible(false);
      }
    else if (vacancy.id === editingVacancyId) {
        setEditingVacancyId(null);
        setVacancyBuf(null);
        setIsFormVisible(false);
      }
    else {
        setEditingVacancyId(null);
        setVacancyBuf(null);
        setIsFormVisible(false);
        setEditingVacancyId(vacancy.id)
        setVacancyBuf({ ...vacancy})
    }
  };

  // Отправляет изменённую форму
  const sendEdit = async () => {
    
    if(vacancyBuf !== null){
    await HR.UpdateVacancy(vacancyBuf.id, vacancyBuf.title, vacancyBuf.description, vacancyBuf.requirements, vacancyBuf.benefits, vacancyBuf.contactEmail, vacancyBuf.contactPhone)

    setEditingVacancyId(null)
    setVacancyBuf(null)
    fetchVacancies();}
  }

  // Удаляет запись
  const handleDelete = async (id) => {
    await HR.DeleteVacancy(id);
    fetchVacancies();
  };

  //Добавление вакансии
  const addVacancy = async () => {
    await HR.AddVacancy(vacancyBuf.title, vacancyBuf.description, vacancyBuf.requirements, vacancyBuf.benefits, vacancyBuf.contactEmail, vacancyBuf.contactPhone);
    fetchVacancies();
    setVacancyBuf(null);
    setIsFormVisible(false)
  }

  const cancelAddVacancy = () => {
    setVacancyBuf(null);
    setIsFormVisible(false)
  }

  return (
    <>
      <Container size="lg" className="vacancies-page">
        <Title order={1} align="center" mt="xs" mb="md">Работа со страницей вакансиий</Title>
        <Text align="center" mb="xl">Вы можете добавить, изменить или удалить записи о вакансиях на сайте.</Text>
        
        <SimpleGrid cols={matches ? 2 : 1} spacing="lg">
          {vacancies.map((vacancy, index) => (
            <Paper key={index} withBorder p="lg" radius="md">
              <Flex direction="column" justify="space-between" style={{ height: '100%' }}>
                <div>
                  <Group position="apart" mb="xs">
                    <Title order={3}>                      
                      {editingVacancyId === vacancy.id ? (
                        <Textarea autosize defaultValue={vacancy.title} onChange={(event) => setVacancyBuf({ ...vacancyBuf, title: event.target.value })}/>
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
                        <Textarea autosize defaultValue={vacancy.description} onChange={(event) => setVacancyBuf({ ...vacancyBuf, description: event.target.value })}/>
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
                        <Textarea autosize defaultValue={vacancy.requirements} onChange={(event) => setVacancyBuf({ ...vacancyBuf, requirements: event.target.value })}/>
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
                        <Textarea autosize defaultValue={vacancy.benefits} onChange={(event) => setVacancyBuf({ ...vacancyBuf, benefits: event.target.value })}/>
                      ) : (
                        <Text size="sm" mb="sm">{vacancy.benefits}</Text>
                      )}
                </div>
                <Divider my="sm" />
                <Grid>
                  <Grid.Col span={matches ? 6 : 12}>
                  {editingVacancyId === vacancy.id ? (
                        <Textarea autosize defaultValue={vacancy.contactEmail} onChange={(event) => setVacancyBuf({ ...vacancyBuf, contactEmail: event.target.value })}/>
                      ) : (
                        
                    <Button
                      variant="outline"
                      fullWidth
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}
                    >
                      <CiMail style={{ marginRight: 8 }} /> {vacancy.contactEmail}
                    </Button>
                    )}
                  </Grid.Col>
                  <Grid.Col span={matches ? 6 : 12}>
                  {editingVacancyId === vacancy.id ? (
                        <Textarea autosize defaultValue={vacancy.contactPhone} onChange={(event) => setVacancyBuf({ ...vacancyBuf, contactPhone: event.target.value })}/>
                      ) : (
                    <Button
                      variant="outline"
                      fullWidth
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}
                    >
                      <FaPhone style={{ marginRight: 8 }} /> {vacancy.contactPhone}
                    </Button>
                      )}
                  </Grid.Col>
                </Grid>
                {editingVacancyId === vacancy.id ? (
                        <Button mt={20} onClick={() => sendEdit(vacancy)}> Отправить </Button>
                      ) : (null)
                }
              </Flex>
              
            </Paper>
          ))}
        </SimpleGrid>
          
        {isFormVisible && (
          <Paper mt={20} withBorder p="lg" radius="md">
            <Title order={3} mb="md">Добавить вакансию</Title>
            <Textarea
              label="Название вакансии"
              name="title"
              onChange={(event) => setVacancyBuf({ ...vacancyBuf, title: event.target.value })}
              mb="md"
            />
            <Textarea
              label="Описание вакансии"
              name="description"
              onChange={(event) => setVacancyBuf({ ...vacancyBuf, description: event.target.value })}
              mb="md"
            />
            <Textarea
              label="Требования"
              name="requirements"
              onChange={(event) => setVacancyBuf({ ...vacancyBuf, requirements: event.target.value })}
              mb="md"
            />
            <Textarea
              label="Преимущества"
              name="benefits"
              onChange={(event) => setVacancyBuf({ ...vacancyBuf, benefits: event.target.value })}
              mb="md"
            />
            <Textarea
              label="Контактный Email"
              name="contactEmail"
              onChange={(event) => setVacancyBuf({ ...vacancyBuf, contactEmail: event.target.value })}
              mb="md"
            />
            <Textarea
              label="Контактный телефон"
              name="contactPhone"
              onChange={(event) => setVacancyBuf({ ...vacancyBuf, contactPhone: event.target.value })}
              mb="md"
            />
            <Button mr={20} onClick={addVacancy}>Добавить вакансию</Button>
            <Button onClick={cancelAddVacancy}>Отмена</Button>
          </Paper>
        )}

        {!isFormVisible && (
          <Button fullWidth mt={20} onClick={() => {setIsFormVisible(true); setVacancyBuf(null); setEditingVacancyId(null)}}>
            Добавить запись
          </Button>
        )}


          
      </Container>
    </>
  );
}
