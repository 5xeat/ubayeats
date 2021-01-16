import React from "react";
import ReactDOM from "react-dom";

import "./home.scss";

// components
import HomeCarousel from "../../components/home/home_carousel.jsx";
import CategoryCardList from "../../components/home/category_card_list.jsx";
import StoreCardList from "../../components/home/store_card_list.jsx";
import Footer from "../../components/home/footer.jsx";

function Home(){
  return (
    <div className="home">
      <div className="home-carousel">
        <HomeCarousel/>
      </div>
      <div className="container">
        <CategoryCardList />
      </div>
      <div className="container">
        <StoreCardList />
      </div>
      <Footer />
    </div>
  );
};

document.addEventListener('turbolinks:load', () => {
  const root = document.querySelector(".home.index #content")
  if (root){
    ReactDOM.render(
      <Home />,
      root
    )
  }
});

