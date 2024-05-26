import React from 'react';
import { Container, Title, Text, List, Paper } from '@mantine/core';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import classes from '../styles/RegPage.module.css';

const RegPage = () => {
  return (
    <>
      <MainHeader/>
      <Container className={classes.content}>
        <Paper shadow="lg" radius="md" withBorder p="xl" className={classes.paper}>
          <Title order={1} className={classes.title}>Регулятивная информация</Title>
          <Text className={classes.text}>
            АО «Речной порт Волга» осуществляет раскрытие информации в соответствии с законодательством Российской Федерации. В основу нашей деятельности положены следующие федеральные законы:
          </Text>
          <List className={classes.list}>
            <List.Item>«Об акционерных обществах»</List.Item>
            <List.Item>«О рынке ценных бумаг»</List.Item>
            <List.Item>«О естественных монополиях»</List.Item>
            <List.Item>«О водоснабжении и водоотведении»</List.Item>
            <List.Item>«О теплоснабжении»</List.Item>
          </List>
          <Text className={classes.text}>
            Мы также придерживаемся всех других соответствующих нормативных актов, чтобы обеспечить прозрачность и соблюдение всех установленных требований.
          </Text>
        </Paper>
      </Container>
      <MainFooter/>
    </>
  );
};

export default RegPage;
