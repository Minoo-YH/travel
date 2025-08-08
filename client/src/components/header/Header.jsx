import React, { useState } from "react";
import headerCSS from "./Header.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Autoplay, Parallax } from "swiper/modules";

const display = {
  delay: 2500,
  disableOnInteraction: false,
};

function Header() {
  const [autoplay, setAutoplay] = useState(display);

  return (
    <div className={headerCSS.header_wrapper}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={autoplay}
        speed={1500}
        parallax={true}
        modules={[Autoplay, Parallax]}
        className={headerCSS.swiper}
      >
        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide1}`}>
            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Explore the world with us
              </small>
              <h2 data-swiper-parallax="100px">
                Experience <span>new adventures</span>
              </h2>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide2}`}>
            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Unforgettable trips await
              </small>
              <h2 data-swiper-parallax="100px">
                Discover your <span>perfect destination</span>
              </h2>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${headerCSS.Header_slide} ${headerCSS.slide3}`}>
            <div className={headerCSS.content}>
              <small data-swiper-parallax="100px">
                Ultimate luxury experiences
              </small>
              <h2 data-swiper-parallax="100px">
                Indulge in <span>luxurious stays</span>
              </h2>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Header;