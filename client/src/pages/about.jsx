import React from 'react';
import { Container, Title, Text, Grid, Image, Card, Group, Button } from '@mantine/core';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import workersImage from '../img/workers.jpg';
import portImage from '../img/port.jpg';
import { StatsGroup } from '../components/StatsGroup';

const AboutUs = () => {
  return (
    <>
      <MainHeader/>
      
      <Container>
        <Title align="center" mt="md" mb="lg">О нас</Title>
        <Text align="center" size="lg" mb="xl">
          Добро пожаловать в речной порт "Волга"! Мы гордимся нашим вкладом в развитие водного транспорта и обслуживанием наших клиентов. Наши заслуги включают:
        </Text>
        <StatsGroup/>
        <Title align="center" mt="md" mb="lg">Наша Миссия</Title>
        <Text align="center" size="lg" mb="xl">
          Наша миссия - предоставлять качественные услуги и развивать водный транспорт, делая его доступным и удобным для всех.
        </Text>
        
        <Grid gutter="xl">
          <Grid.Col md={6} sm={12}>
            <Card shadow="sm" p="lg">
              <Card.Section>
                <Image src={portImage} alt="Наш порт" />
              </Card.Section>
              <Group direction="column" spacing="xs" mt="md">
                <Text size="lg" weight={500}>Наши услуги</Text>
                <Text>
                  Мы предлагаем широкий спектр услуг, включая грузоперевозки, пассажирские перевозки и аренду судов. Наш порт оснащен
                  современным оборудованием для обработки грузов и комфортабельными терминалами для пассажиров.
                </Text>
              </Group>
            </Card>
          </Grid.Col>
          
          <Grid.Col md={6} sm={12}>
            <Card shadow="sm" p="lg">
              <Card.Section>
                <Image src={workersImage} alt="Наши сотрудники"/>
              </Card.Section>
              <Group direction="column" spacing="xs" mt="md">
                <Text size="lg" weight={500}>Наша команда</Text>
                <Text>
                  Наша команда состоит из опытных профессионалов, которые стремятся обеспечить наилучшее обслуживание для наших клиентов.
                  Мы ценим каждого сотрудника и гордимся нашей дружной и сплоченной командой.
                </Text>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
        
        <Text align="center" size="lg" mt="xl" mb="xl">
          Наш порт расположен на берегу реки Волга, обеспечивая удобный доступ к важным водным маршрутам и торговым путям.
        </Text>
      
      </Container>
      <MainFooter/>
    </>
  );
};

export default AboutUs;
