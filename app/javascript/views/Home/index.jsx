import React from "react";
import classnames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classnames.bind(styles);

// components
import HomeCarousel from "../../components/home#index/carousel.jsx";

const Home = () => {
  const flag = true;
  return (
    <div className={cx("home", { aaa: flag })}>
      Home
      <HomeCarousel />
    </div>
  );
};

export default Home;
