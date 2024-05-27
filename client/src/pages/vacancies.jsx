import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Title, Text, Container, Group, ActionIcon, Paper, Grid, Button, SimpleGrid, Divider } from '@mantine/core';
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { useClipboard } from '@mantine/hooks';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import '../styles/vacancies.css';
import Contact from '../services/Unauth'; // Импортируем ваш сервис для запроса вакансий

export default function VacanciesPage() {
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

  return (
    <>
      <MainHeader />
      <Container size="lg" className="vacancies-page">
        <Title order={1} align="center" mt="xs" mb="md">Актуальные предложения</Title>
        <Text align="center" mb="xl">Присоединяйтесь к нашему коллективу.</Text>
        
        <SimpleGrid cols={matches ? 2 : 1} spacing="lg">
          {vacancies.map((vacancy, index) => (
            <Paper key={index} withBorder p="lg" radius="md">
              <Group position="apart" mb="xs">
                <Title order={3}>{vacancy.title}</Title>
                <ActionIcon size="lg" color="gray" onClick={() => clipboard.copy(`${vacancy.title}\n\n${vacancy.description}\n\nТребования:\n${vacancy.requirements}\n\nМы предлагаем:\n${vacancy.benefits}\n\nКонтактный Email: ${vacancy.contactEmail}\nКонтактный телефон: ${vacancy.contactPhone}`)}>
                  <TbDeviceDesktopAnalytics />
                </ActionIcon>
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
              <Divider my="sm" />
              <Grid>
                <Grid.Col span={matches ? 6 : 12}>
                  <Button leftIcon={<CiMail />} variant="outline" fullWidth onClick={() => window.location.href = `mailto:${vacancy.contactEmail}`}>
                    Связаться по почте
                  </Button>
                </Grid.Col>
                <Grid.Col span={matches ? 6 : 12}>
                  <Button leftIcon={<FaPhone />} variant="outline" fullWidth onClick={() => window.location.href = `tel:${vacancy.contactPhone}`}>
                    Связаться по телефону
                  </Button>
                </Grid.Col>
              </Grid>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
      <MainFooter />
    </>
  );
}
