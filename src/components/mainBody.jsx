import { Carousel } from "antd";
import React from 'react';
import '../styles/main/main.css';

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const contentStyleWithImage = (imageUrl) => ({
  ...contentStyle,
  backgroundImage: `linear-gradient(rgba(255, 230, 250, 0.8), rgba(135, 206, 250, 0.8)), url('${imageUrl}')`,
  background: '#364d79',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const MainBody = () => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <div className="main-main-container">
      <Carousel afterChange={onChange} >
        <div>
        <h3 style={contentStyleWithImage('https://s0.rbk.ru/v6_top_pics/media/img/7/27/756438816786277.jpg')}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>

  );
};

export default MainBody;
