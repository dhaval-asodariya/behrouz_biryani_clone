import { Container } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./Hero.css";
import React from "react";
import Dataset from "../Dataset/Dataset";
import { useSelector } from "react-redux";

function Hero() {
  const windowWidth= useSelector((state)=>state.windowWidth.width)

  return (
    <div style={{ padding: "0px 0px 20px ",borderBottom:'1px solid #dcd3d3c4' }}>
      <Container className="swiperContainer" >
        <Swiper 
          slidesPerView={windowWidth>1300?3:'auto'}
          spaceBetween={windowWidth>800?30:20}
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          className="mySwiper"
        >
           { Dataset[0].render_data.map((bannerItem)=>{
            return(
                <SwiperSlide style={{ backgroundImage: `url(${bannerItem.background_image})`,backgroundSize:'cover'}}></SwiperSlide>
            )
           })}
          
        </Swiper>
      </Container>
    </div>
  );
}

export default Hero;
