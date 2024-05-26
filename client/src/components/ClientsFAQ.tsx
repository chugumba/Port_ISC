import { Container, Title, Accordion } from '@mantine/core';
import classes from '../styles/ClientsFAQ.module.css';
import React from 'react';

const placeholder =
  'Информация временно недоступна. Пожалуйста, свяжитесь с нашей службой поддержки для получения подробностей.';

export function ClientsFAQ() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Часто задаваемые вопросы
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="working-hours">
          <Accordion.Control>Какие часы работы порта?</Accordion.Control>
          <Accordion.Panel>Порт "Волга" работает круглосуточно, 7 дней в неделю.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="services">
          <Accordion.Control>Какие услуги вы предоставляете?</Accordion.Control>
          <Accordion.Panel>Мы предоставляем широкий спектр услуг, включая погрузку и разгрузку грузов, а также их хранение. Более подробно о предоставляемых услугах вы можете узнать на странице "Услуги"</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="tariffs">
          <Accordion.Control>Где можно узнать о ценах на ваши услуги?</Accordion.Control>
          <Accordion.Panel>Все цены на предоставляемые услуги вы можете узнать связавшись с отделом продаж.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="contact">
          <Accordion.Control>Как связаться с вашей службой поддержки?</Accordion.Control>
          <Accordion.Panel>Вы можете связаться с нами по телефону, указанному внизу страницы или отправить запрос на электронную почту. Помимо этого вы можете оставить свои контактные данные в форме на главной странице.</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="cargo-tracking">
          <Accordion.Control>Можно ли отслеживать мой груз?</Accordion.Control>
          <Accordion.Panel>Пока что мы не предоставляем услуг по отслеживанию грузов.</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
