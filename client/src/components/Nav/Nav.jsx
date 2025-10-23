import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import navCSS from "./Nav.module.css";
import XSound from "@assets/XSound.wav";
import "./Nav.module.css"

const navItemses = [
  { label: "Home", path: "/" },
  { label: "Map", path: "/map" },
  { label: "Contact", path: "/Contact" },
  { label: "Discover", path: "/Discover" },
  { label: "Sound", action: "toggleSound" },
];

function Nav() {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const [isSoundOn, setIsSoundOn] = useState(
    () => localStorage.getItem("soundOn") === "true"
  );
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("userId") !== null 
  );
  
  const audioRef = useRef(new Audio(XSound));

  const handleLogout = () => {
    sessionStorage.clear();
    alert("You have logged out successfully.");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/RegisterLogin");
  };

  useEffect(() => {
    if (!isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    localStorage.setItem("soundOn", isSoundOn.toString());
  }, [isSoundOn]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSound = () => setIsSoundOn((prev) => !prev);

  const handleAction = (action) => {
    if (action === "toggleSound") {
      toggleSound();
    } else if (action === "handleLogout") {
      handleLogout();
    }
  };

  const navItems = [
    ...navItemses,
    isLoggedIn
      ? { label: "Profile", path: "/UserProfile" } 
      : { label: "Login", path: "/RegisterLogin", onClick: handleLogin },
    isLoggedIn
      ? { label: "Logout", action: "handleLogout" }
      : null, 
  ].filter(Boolean); 

  return (
    <nav className={navCSS.nav_wrapper}>
      <div className={navCSS.logo}>
        <a href="/">
          Traveler<span>X</span>
        </a>
      </div>

      <div>
        {!isMobile && (
          <ul className={navCSS.navList}>
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path || "#"}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      handleAction(item.action);
                    } else if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isMobile && (
        <div className={navCSS.Nav_btns}>
          <button
            className="nav-button"
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          >
            <i id={navCSS.bras}>menu</i>
          </button>
        </div>
      )}

      {isMobile && isMenuVisible && (
        <ul className={navCSS.showNav}>
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path || "#"}
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault();
                    handleAction(item.action);
                  } else if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Nav;



