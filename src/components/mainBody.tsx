import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Paper, Title, useMantineTheme, Text } from '@mantine/core';
import '../styles/main/main.css'

const data = [
  {
    image:
      'https://www.marineinsight.com/wp-content/uploads/2023/05/10-Biggest-River-Ports-In-The-World.jpg',
    title: 'Узнайте о нас больше',
    category: 'О нас',
    direct: "#",
  },
  {
    image:
      'https://www.marineinsight.com/wp-content/uploads/2023/05/Port-of-Shanghai.jpg',
    title: 'Современный речной порт',
    category: 'Технологии',
    direct: "#",
  },
  {
    image:
      'https://wpassets.porttechnology.org/wp-content/uploads/2020/03/25160959/Peel-Ports-workers-Liverpool2.jpg',
    title: 'Работа в дружном коллекитве',
    category: 'Работа',
    direct: "#",
  }
];

interface CardProps {
  image: string;
  title: string;
  category: string;
  direct: string;
}

function Card({ image, title, category, direct }: CardProps) {
  return (

    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className="card"
    >
      <div>
        <Text className='category' size="xs">
          {category}
        </Text>
        <Title order={3} className='title'>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark" component="a"
      href = {direct}>
        Узнать больше 
      </Button>
    </Paper>
  );
}

function MainBody() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <div className='main-main-container'>
      <Carousel 
        slideSize= "80%"
        slideGap={{ base: 'xl', sm: 3 }}
        align="center"
        loop 
        withIndicators
      >
        {slides}
      </Carousel>
    </div>

  );
}

export default MainBody;