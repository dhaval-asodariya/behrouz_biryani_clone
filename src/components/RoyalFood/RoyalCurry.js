import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import "./RoyalCurry.css";
import { Link } from "react-router-dom";
// import Link from "@mui/material/Link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Dataset from "../Dataset/Dataset";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ReactComponent as VegIcon } from "../../Assets/Images/icons/veg.svg";
import { ReactComponent as NonVegIcon } from "../../Assets/Images/icons/non-veg.svg";
import { ReactComponent as star } from "../../Assets/Images/icons/star.svg";

import SvgIcon from "@mui/material/SvgIcon";
import { useSelector } from "react-redux";

function RoyalCurry() {
  const windowWidth = useSelector((state) => state.windowWidth.width);
  function NameComponent(name) {
    const truncatedName =
      name.length > 22 ? name.substring(0, 20) + "..." : name;

    return <div> {truncatedName}</div>;
  }
  
 
  return (
    <div className="AllCategory-section">
      <Container className="AllCategory-container">
        <Box className="AllCategory-title">
          <Typography variant="h1">Royal Curries & Breads</Typography>
          <Link to="allCategories/royal-curries-breads" color="inherit">
            See All
            <ArrowRightIcon></ArrowRightIcon>
          </Link>
        </Box>

        <Box className="AllCategory-carousal">
          <Box className="position-wraper">
            <Swiper
              className="RoyalCurry-swiper"
              slidesPerView={"auto"}
              spaceBetween={18}
              keyboard={{
                enabled: true,
              }}
              //   navigation={true}
              navigation={{
                prevEl: ".custom-swiper-RoyalCurry-button-prev", // Bind custom prev button
                nextEl: ".custom-swiper-RoyalCurry-button-next", // Bind custom next button
              }}
              modules={[Keyboard, Pagination, Navigation]}
              //   className="mySwiper"
            >
              {Dataset[5].render_data.map((RoyalCurryItem) => {
                return (
                    <SwiperSlide className="SahiBiryanies-slide-card RoyalCurry-card-dimention">
                  <Link key={RoyalCurryItem.product_id} to={`/product/${RoyalCurryItem.product_id}`}>

                      <Box className="SahiBiryanies-slide-cardInner-img RoyalCurry-cardInner-dimention">
                        <img
                          className="SahiBiryanies-slide-img RoyalCurry-img-dimention"
                          src={RoyalCurryItem.product_imageUrl}
                        ></img>
                      </Box>
                      <Box className="sahi-itemDiscription">
                        <Box>
                          <SvgIcon
                            sx={{ fontSize: "14px", marginRight: "10px" }}
                            component={
                              RoyalCurryItem.is_veg ? VegIcon : NonVegIcon
                            }
                            viewBox="0 0 10 10"
                          />

                          <Typography>
                            {NameComponent(RoyalCurryItem.product_name)}
                          </Typography>
                        </Box>
                        <Box className="price-add-box">
                          <Box>
                            <Typography>
                              <span>₹</span>
                              {RoyalCurryItem.display_price}
                            </Typography>
                          </Box>
                          <Box className="rattings">
                            <SvgIcon
                              sx={{ fontSize: "12px", marginRight: "5px" }}
                              component={star}
                            ></SvgIcon>
                            <Typography>{RoyalCurryItem.rating}</Typography>
                          </Box>
                        </Box>
                      </Box>
                  </Link>

                    </SwiperSlide>
                );
              })}
            </Swiper>
            <button className="custom-swiper-RoyalCurry-button-prev swiper-prev-style">
              <KeyboardArrowLeftIcon
                sx={{ fontSize: "27px" }}
              ></KeyboardArrowLeftIcon>
            </button>
            <button className="custom-swiper-RoyalCurry-button-next swiper-next-style">
              <KeyboardArrowRightIcon
                sx={{ fontSize: "27px" }}
              ></KeyboardArrowRightIcon>
            </button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default RoyalCurry;
