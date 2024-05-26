import React from 'react';
import MainHeader from '../components/mainHeader';
import MainFooter from '../components/mainFooter';
import { Container, Grid, Text, Title, Anchor, Image, List, ThemeIcon } from '@mantine/core';
import { IconTruck, IconPackage, IconBoxMultiple, IconBuildingWarehouse } from '@tabler/icons-react';
import styles from '../styles/services.module.css';

const ServicesPage = () => {
  return (
    <>
      <MainHeader/>
      <Container size="sm" className={styles.container}>
        <Title order={1} mb={20} className={styles.title}>
          Услуги
        </Title>

        <Grid cols={2} gap={40}>
          <div>
            <Text size="xl" weight={700} mb={10} className={styles.heading}>
              Основные услуги
            </Text>
            <List spacing="xs" size="sm" className={styles.list}>
              <List.Item className={styles.listItem}>
                <ThemeIcon color="blue" size={24} className={styles.icon}>
                  <IconTruck size={16} />
                </ThemeIcon>
                Погрузка/выгрузка транспортных средств
              </List.Item>
              <List.Item className={styles.listItem}>
                <ThemeIcon color="blue" size={24} className={styles.icon}>
                  <IconPackage size={16} />
                </ThemeIcon>
                Контроль количества и состояния груза
              </List.Item>
              <List.Item className={styles.listItem}>
                <ThemeIcon color="blue" size={24} className={styles.icon}>
                  <IconBoxMultiple size={16} />
                </ThemeIcon>
                Получение/выдача грузов
              </List.Item>
              <List.Item className={styles.listItem}>
                <ThemeIcon color="blue" size={24} className={styles.icon}>
                  <IconBuildingWarehouse size={16} />
                </ThemeIcon>
                Хранение грузов
              </List.Item>
            </List>
          </div>

          <div>
            <Text size="lg" weight={700} mb={10} className={styles.heading}>
              Дополнительные работы, связанные с обработкой грузов:
            </Text>
            <List spacing="xs" size="sm" className={styles.list} icon={<IconTruck size={24} />}>
              <List.Item>Подработка, переупаковка, маркировка и сортировка грузов</List.Item>
              <List.Item>Дополнительное и специальное крепление грузов на судах</List.Item>
              <List.Item>
                Предоставление инфраструктуры для стоянки судов, не осуществляющих грузовых операций
              </List.Item>
              <List.Item>Швартовые операции</List.Item>
              <List.Item>Предоставление перегрузочной техники</List.Item>
              <List.Item>Сухая зачистка грузовых помещений судна</List.Item>
              <List.Item>Штивка груза на борту судна</List.Item>
              <List.Item>Экспедиционное обслуживание</List.Item>
              <List.Item>
                Согласование заявок на перевозку импортных грузов железнодорожным транспортом
              </List.Item>
              <List.Item>Оформление коносаментов и грузовых манифестов</List.Item>
              <List.Item>Прочие услуги в соответствии с договором</List.Item>
            </List>
          </div>
        </Grid>
      </Container>
      <MainFooter/>
    </>
  );
};

export default ServicesPage;
