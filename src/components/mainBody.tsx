import React, { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import '../styles/main/main.css';

function MainBody() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (

    <main>
      <div className='main-main-container'>
        <div className='main-carousele-container'>
          <Carousel className='carousele-main'
            withIndicators
            height={200}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
          >
            <Carousel.Slide>1</Carousel.Slide>
            <Carousel.Slide>2</Carousel.Slide>
            <Carousel.Slide>3</Carousel.Slide>
            {/* ...other slides */}
          </Carousel>
      </div>
      </div>
    </main>
  );
}

export default MainBody;