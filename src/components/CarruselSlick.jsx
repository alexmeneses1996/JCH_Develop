import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const images = [

    'https://res.cloudinary.com/dqgbna4ni/image/upload/v1747507534/bh9vfydz1jg5tjn3hd8i.jpg',
    'https://res.cloudinary.com/dqgbna4ni/image/upload/v1747507931/wyixvwghnmbggo3qexyf.jpg',
    'https://res.cloudinary.com/dqgbna4ni/image/upload/v1747507927/p98kachrkdhjoidtjlvx.jpg',
  'https://res.cloudinary.com/dqgbna4ni/image/upload/v1747507929/v3aabytkzxx3iwzkzim1.jpg',
];

const CarruselSlick = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ width: "90%", height:'50%', mx: 'auto', pt:'4px' }}>
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box key={index} component="img" src={img} alt={`img-${index}`} sx={{ width: '100%',height:'450px', objectFit:'cover' }} />
        ))}
      </Slider>
    </Box>
  );
};

export default CarruselSlick;
