import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./LogIn";
import Nav from "@Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { useValue } from "../../Middleware/context/ContextProvider";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./Auth.css";


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
    sessionStorage.setItem("userId", userData.id);
    setUser(userData);
    navigate(redirectPath);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/RegisterLogin");
    }
  }, [navigate]);

  return (
    <div>
      <Nav />
      <div className="auth-container">
        <div className="divider"></div>

   {/* <img src={logiX} alt="logiX" /> */}
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
