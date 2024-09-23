import React, { useState } from "react";
import { Link } from "react-router-dom";
import Styled from "./Navigation.module.css";

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header>
      <nav>
        <div
          className={`${Styled.res_bar} ${isSidebarOpen ? Styled.show : ""}`}
        >
          <ul className={Styled.sidebar}>
            <li className={Styled.close_btn} onClick={closeSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="34px"
                viewBox="0 -960 960 960"
                width="34px"
                fill="#000000"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </li>
            <li>
              <Link to="/advice-for-artists" onClick={closeSidebar}>
                Advice For Artists
              </Link>
            </li>
            <li>
              <Link to="/help" onClick={closeSidebar}>
                Help
              </Link>
            </li>
            <li>
              <Link to="/page_about" onClick={closeSidebar}>
                About
              </Link>
            </li>
          </ul>
        </div>
        <ul className={Styled.sidebar1}>
          <li className={Styled.img_img}>
            <Link to="/GAS/">
              <img src="./Images/logo.png" alt="Logo" />
            </Link>
          </li>
          <li className={Styled.hidonmobile}>
            <Link to="/help">Help</Link>
          </li>
          <li className={Styled.hidonmobile}>
            <Link to="/page_about">About</Link>
          </li>
          <li className={Styled.menu_btn}>
            <Link onClick={toggleSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="26px"
                viewBox="0 -960 960 960"
                width="26px"
                fill="#000000"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
