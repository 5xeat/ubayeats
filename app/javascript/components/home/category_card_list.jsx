import React from 'react'
import "./home.scss";
import Rails from '@rails/ujs';

// components
import CategoryCard from './category_card.jsx'

const data = [
  {
    id: 1,
    title: "日式",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921811.svg",
  },
  {
    id: 2,
    title: "韓式",
    image: "https://www.flaticon.com/svg/static/icons/svg/2511/2511138.svg",
  },
  {
    id: 3,
    title: "速食",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921822.svg",
  },

  {
    id: 4,
    title: "飲料",
    image: "https://www.flaticon.com/svg/static/icons/svg/2921/2921819.svg",
  },
  {
    id: 5,
    title: "甜點",
    image: "https://www.flaticon.com/svg/static/icons/svg/1997/1997775.svg",
  },
  {
    id: 6,
    title: "蔬食",
    image: "https://www.flaticon.com/svg/static/icons/svg/1998/1998095.svg",
  },
];

const geoFindMe = (keyword) => {
  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    Turbolinks.visit(`/stores/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`)
  }
  function error() {
    Rails.ajax({
      url: "/stores/recommand.json",
      type: "GET",
      success: (resp) => {
        Turbolinks.visit(`/stores/search?keyword=${keyword}`)
      },
      error: function(err) {
      }
    })
  }

  if(!navigator.geolocation) {
    console.log('您的瀏覽器不支援定位服務!');
  } else {
    console.log('正在取得定位…!');
    navigator.geolocation.getCurrentPosition(success, error);
  }
}


const atClick = (item) => {
  const keyword = item
  let latitude, longitude
  geoFindMe(keyword)
}

function CategoryCardList(){
  let latitude, longitude, href
  return(
    <div className="category-card-list">
      {
        data.map((item) => {
          return(
            <CategoryCard 
              {...item}
              key={item.id}
              onClick={atClick}
            />
          )
        })
      }
    </div>
  );
}

export default CategoryCardList;