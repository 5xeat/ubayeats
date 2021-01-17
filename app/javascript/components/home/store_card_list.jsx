import React, {useState, useEffect} from "react";
import Rails from '@rails/ujs'

import "./home.scss";

// components
import StoreCard from './store_card.jsx'

function StoreCardList(){

  const [data, setData] = useState([])

  useEffect(() => {
    geoFindMe()
  }, [])

  const geoFindMe = () => {
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      Rails.ajax({
        url: '/distance_filter.json',
        type: 'GET',
        data: new URLSearchParams({latitude: latitude, longitude: longitude}),
        success: (resp) => {
          setData(resp)
        },
        error: function(err) {
          console.log(err);
        }
      })
    }
    function error() {
      Rails.ajax({
        url: "/stores/recommand.json",
        type: "GET",
        success: (resp) => {
          setData(resp)
        },
        error: function(err) {
          console.log(err);
        }
      })
    }
  
    if(!navigator.geolocation) {
      console.log('您的瀏覽器不支援定位服務!');
      Rails.ajax({
        url: "/stores/recommand.json",
        type: "GET",
        success: (resp) => {
          setData(resp)
        },
        error: function(err) {
          console.log(err);
        }
      }) 
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  const atClick = (store) => {
    Turbolinks.visit(`/stores/${store}/delicacy`)
  }
  
  return(
    <div className="store-card-list">
      {
        data.map((store) => {
          return(
            <StoreCard 
              {...store}
              key={store.id}
              onClick={atClick}
            />
          )
        })
      }
    </div>
  );
}

export default StoreCardList;