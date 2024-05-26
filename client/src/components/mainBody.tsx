import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Button, Paper, Title, useMantineTheme, Text, TextInput, Checkbox, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import '../styles/main/main.css';
import {GetInTouchSimple} from './contactForm';

const data = [
  {
    image:
      'https://www.marineinsight.com/wp-content/uploads/2023/05/10-Biggest-River-Ports-In-The-World.jpg',
    title: 'Узнайте о нас больше',
    category: 'О нас',
    direct: "/about",
  },
  {
    image:
      'https://www.marineinsight.com/wp-content/uploads/2023/05/Port-of-Shanghai.jpg',
    title: 'Современный речной порт',
    category: 'Технологии',
    direct: "/services",
  },
  {
    image:
      'https://wpassets.porttechnology.org/wp-content/uploads/2020/03/25160959/Peel-Ports-workers-Liverpool2.jpg',
    title: 'Работа в дружном коллекитве',
    category: 'Работа',
    direct: "/vacancies",
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
      <Button variant="white" color="dark" component={Link}
      to = {direct}>
        Узнать больше 
      </Button>
    </Paper>
  );
}

function contactForm() {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false, 
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Неверный email'),
      termsOfService: (value) => (value === true ? null : 'Необходимо подтвердить согласие'),
    },
  });

  return (
    <Box maw={340} mx="auto" className="main-contact-box">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <Checkbox
          mt="md"
          label="Я согласен на обработку персональных данных"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

function MainBody() {
  //const theme = useMantineTheme();
  //const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <main className='main-main-container'>
      <div className='main-carousele-container'>
        <Carousel 
          slideSize= "80%"
          slideGap={{ base: 'xl', sm: 3 }}
          align="center"
          loop 
          withIndicators
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
        >
          {slides}
        </Carousel>
      </div>

      <div className='main-contact-form-container'>
        <div className='main-contact-form'> 
          <Paper shadow="md" radius="lg" p="xl" className='main-contact-paper'>
          <GetInTouchSimple/>
          </Paper>
        </div>
        
      </div>      
    </main>

  );
}

export default MainBody;