import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./LogIn";
import Nav from "@Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { useValue } from "../../Middleware/context/ContextProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./aauth.css";

function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { state, setUser } = useValue();

  const redirectPath = location.state?.from?.pathname || "/";

  const handleSlideChange = (swiper) => {
    setIsLogin(swiper.activeIndex === 0);
  };

  const handleLoginSuccess = (userData) => {
    // ØªØ®Ø²ÙŠÙ† Ø§Ù„ØªÙˆÙƒÙ† ÙˆØ§Ù„Ø¨ÙŠØ§Ù†Ø§Øª
    sessionStorage.setItem("token", userData.token);
    sessionStorage.setItem("userId", userData.id);
    sessionStorage.setItem("email", userData.email);

    setUser(userData);
    navigate(redirectPath);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/RegisterLogin");
    }
  }, [navigate]);

  return (
    <div>
      <Nav />
      <div className="auth-container">
        <div className="divider"></div>

        <p>{isLogin ? "Swipe to Register" : "Swipe to Login"}</p>

        <div className="auth-forms">
          <div className="auth-card">
            <Swiper
              onSlideChange={handleSlideChange}
              spaceBetween={0}
              slidesPerView={1}
              className="swiper-container"
              effect="slide"
            >
              <SwiperSlide>
                <div className="auth-form">
                  {/* ØªÙ…Ø±ÙŠØ± onLoginSuccess Ù‡Ù†Ø§ */}
                  <Login redirectPath={redirectPath} onLoginSuccess={handleLoginSuccess} />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="auth-form">
                  <Register />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterLogin;



