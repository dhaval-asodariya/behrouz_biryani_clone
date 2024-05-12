import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Container } from "@mui/material";
import './MySwiper.css'
import Dataset from "../Dataset/Dataset";

function MySwiper() {
  return (
    <div>
      <Container className="swiperContainer">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
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
          {Dataset[0].render_data.map((bannerItem) => {
            return (
              <SwiperSlide
                style={{
                  backgroundImage: `url(${bannerItem.background_image})`,
                  backgroundSize: "cover",
                }}
              ></SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </div>
  );
}

export default MySwiper;
