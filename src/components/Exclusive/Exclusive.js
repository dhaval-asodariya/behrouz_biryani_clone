import { Box, Container, Typography } from "@mui/material";
import React from "react";

import "./Exclusive.css";
import { Link  } from "react-router-dom";
// import Link from "@mui/material/Link";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Dataset from "../Dataset/Dataset";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategory } from "../../Redux/ActiveCategorySlice";

function Exclusive() {
  const dispatch = useDispatch();
  const windowWidth= useSelector((state)=>state.windowWidth.width)

  function NameComponent(name) {

    const truncatedName = windowWidth>1600?(name.length > 30 ? name.substring(0, 23) + '...' : name):(name.length > 23 ? name.substring(0, 20) + '...' : name);
  
    return (<div> {truncatedName}</div>
     
     
    );
  }
  return (
    <div className="exclusive-section">
      <Container className="exclusive-container">
        <Box className="exclusive-title">
          <Typography variant="h1">Exclusively on Behrouz</Typography>
          <Link onClick={()=>dispatch(setActiveCategory("exclusively-on-behrouz-app"))} to="allCategories/exclusively-on-behrouz-app"  color="inherit">
            See All
            <ArrowRightIcon></ArrowRightIcon>
          </Link>
        </Box>
        <Box className='exclusive-carousal'>
        <Swiper className='exclusive-swiper'
          slidesPerView={"auto"}
          spaceBetween={windowWidth >800 ? 30 : 15}
          keyboard={{
            enabled: true,
          }}
         
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
        //   className="mySwiper"
        >
          {Dataset[1].render_data.map((ExclusiveItem) => {
            return (
              <SwiperSlide className="exclusive-slide-card" > 
                <Box className='slide-cardInner-img' ><img className="exclusive-slide-img" src={ExclusiveItem.image}></img></Box>
               <Box className='itemDiscription'>
               <Typography>{NameComponent(ExclusiveItem.name)}</Typography>
               </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
        </Box>
      </Container>
    </div>
  );
}

export default Exclusive;
