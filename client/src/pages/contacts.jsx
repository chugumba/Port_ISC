import React from 'react';
import { Container, Title, Divider } from '@mantine/core';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import { Contacts } from '../components/Contacts';
import classes from '../styles/ContactsPage.module.css';
import CEO from '../img/contacts/CEO.jpg'
import logistics from '../img/contacts/logistics.jpg'
import engineer from '../img/contacts/engineer.jpg'
import chancellery from '../img/contacts/chancellery.jpg'
import press from '../img/contacts/press.jpg'
import commerce from '../img/contacts/commerce.jpg'


const ContactsPage = () => {
  return (
    <>
      <MainHeader />
      <Container className={classes.content}>
        <Title order={1} className={classes.title}>
          Контакты
        </Title>
        <Divider my="lg" size="md" />

        <div className={classes.columns}>
          <div className={classes.column}>
            <Contacts
              title="Генеральный директор" 
              name="Иван Иванов" 
              email="ivanov@example.com" 
              phone="+7 123 456 7890" 
              avatar={CEO} 
            />
            <Divider my="lg" size="md"/>
            <Contacts
              title="Отдел логистики" 
              name="Петр Петров" 
              email="petrov@example.com" 
              phone="+7 987 654 3210" 
              avatar={logistics}
            />
            <Divider my="lg" size="md"/>
            <Contacts
              title="Главный инженер" 
              name="Сергей Сергеев" 
              email="sergeev@example.com" 
              phone="+7 123 987 6543" 
              avatar={engineer}
            />
          </div>

          <div className={classes.column}>
            <Contacts
              title="Канцелярия" 
              name="Мария Смирнова" 
              email="office@example.com" 
              phone="+7 321 654 9870" 
              avatar={chancellery} 
            />
            <Divider my="lg" size="md"/>
            <Contacts
              title="Контакты для прессы" 
              name="Алексей Кузнецов" 
              email="press@example.com" 
              phone="+7 654 321 0987" 
              avatar={press}
            />
            <Divider my="lg" size="md"/>
            <Contacts
              title="Коммерческая служба" 
              name="Елена Ковалева" 
              email="commercial@example.com" 
              phone="+7 789 012 3456" 
              avatar={commerce} 
            />
          </div>
        </div>
      </Container>
      <MainFooter />
    </>
  );
};

export default ContactsPage;
