import { Text } from '@mantine/core';
import React from 'react';
import classes from '../styles/StatsGroup.module.css';

const data = [
  {
    title: 'Обслуженных судов',
    stats: '1,200',
    description: 'В этом году было обслужено более 1 200 судов, с гарантией бесперебойной и эффективной работы.',
  },
  {
    title: 'Общий груз (тонны)',
    stats: '500,000',
    description: 'Обработано 500 000 тонн грузов, поддерживая региональную и международную торговлю.',
  },
  {
    title: 'Сотрудников',
    stats: '300',
    description: 'Целеустремлённая команда из 300 сотрудников, усертно трудится, чтобы предоставить вам лучший сервис.',
  },
  {
    title: 'Лет бесперебойной работы',
    stats: '10',
    description: 'Обрабатываем грузы без остановок 10 лет подряд.',
  },
];

export function StatsGroup() {
  const stats = data.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));
  return <div className={classes.root}>{stats}</div>;
}
