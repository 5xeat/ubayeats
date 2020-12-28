import React from "react";
import classnames from "classnames/bind";
import styles from "./style.module.scss";

const cx = classnames.bind(styles);

// components
import HomeCarousel from "../../components/home/home_carousel.jsx";
import CategoryCardList from "../../components/home/category_card_list.jsx";
import StoreCardList from "../../components/home/store_card_list.jsx";

function Home(){
  const flag = true;
  return (
    <div className={cx("home", { aaa: flag })}>
      <div className="home-carousel">
        <HomeCarousel/>
      </div>
      <div className="container">
        <CategoryCardList />
      </div>
      <div className="container">
        <StoreCardList />
      </div>
    </div>
  );
};

export default Home;
