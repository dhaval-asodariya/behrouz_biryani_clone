import { Box, Container, Typography } from "@mui/material";

import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Link from "@mui/material/Link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Dataset from "../Dataset/Dataset";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./AllCategory.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useSelector } from "react-redux";

function AllCategory() {
  const windowWidth= useSelector((state)=>state.windowWidth.width)
  function NameComponent(name) {
   
    const truncatedName = windowWidth>1600?(name.length > 30 ? name.substring(0, 23) + '...' : name):(name.length > 23 ? name.substring(0, 20) + '...' : name);
  
    return (<div> {truncatedName}</div>
     
     
    );
  }
  return (
    <div className="AllCategory-section">
      <Container className="AllCategory-container">
        <Box className="AllCategory-title">
          <Typography variant="h1">All Categories</Typography>
          <Link to="/allCategories" color="inherit">
            See All
            <ArrowRightIcon></ArrowRightIcon>
          </Link>
        </Box>

        <Box className="AllCategory-carousal">
          <Box className="position-wraper">
            <Swiper
              className="AllCategory-swiper"
              slidesPerView={windowWidth>1300?6:'auto'}
              spaceBetween={18}
              keyboard={{
                enabled: true,
              }}
              // navigation={true}
              navigation={{
                prevEl: ".custom-swiper-button-prev", // Bind custom prev button
                nextEl: ".custom-swiper-button-next", // Bind custom next button
              }}
              modules={[Keyboard, Pagination, Navigation]}
              //   className="mySwiper"
            >
              {Dataset[2].render_data.map((ExclusiveItem) => {
                return (
                  <SwiperSlide className="AllCategory-slide-card">
                    <Link to="/allCategories"> 
                    <Box className="AllCategory-slide-cardInner-img">
                      <img
                        className="AllCategory-slide-img"
                        src={ExclusiveItem.image}
                      ></img>
                    </Box>
                    </Link>
                    <Box className='itemDiscription'>
                       
                      <Typography>{NameComponent(ExclusiveItem.name)}</Typography>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <button className="custom-swiper-button-prev swiper-prev-style">
              <KeyboardArrowLeftIcon sx={{fontSize:'27px'}}></KeyboardArrowLeftIcon>
            </button>
            <button className="custom-swiper-button-next swiper-next-style">
              <KeyboardArrowRightIcon sx={{fontSize:'27px'}}></KeyboardArrowRightIcon>
            </button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default AllCategory;
