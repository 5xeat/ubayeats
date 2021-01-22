import React, {useState, useEffect} from "react";
import Rails from '@rails/ujs'

import "./home.scss";

// components
import StoreCard from './store_card.jsx'

const defaultStore = [
  {
    id: 1,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 2,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 3,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 4,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 5,    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 6,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 7,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 8,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 9,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 10,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 11,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  },
  {
    id: 12,
    store_name: null,
    place_id: null,
    description: null,
    favorite: false
  }
]

function StoreCardList(){

  const [data, setData] = useState(defaultStore)

  useEffect(() => {
    geoFindMe()
  }, [])

  const geoFindMe = () => {
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      Rails.ajax({
        url: '/stores/distance_filter.json',
        type: 'POST',
        data: JSON.stringify({latitude: latitude, longitude: longitude}),
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
        type: "POST",
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
        type: "POST",
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

  const atCardClick = (store) => {
    Turbolinks.visit(`/stores/${store}/delicacy`)
  }

  const atHeartClick = (e, store) => {
    e.preventDefault()
    e.stopPropagation()
    const icon = e.currentTarget.querySelector('.fa-heart')
    icon.classList.toggle('far');
    icon.classList.toggle('fas');
    Rails.ajax({
      url: `/stores/${store}/favorite`,
      type: 'POST',
      success: (resp) => {
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  return(
    <div className="store-card-list">
      {
        data.map((store) => {
          return(
            <StoreCard 
              {...store}
              key={store.id}
              atCardClick={atCardClick}
              atHeartClick={atHeartClick}
            />
          )
        })
      }
    </div>
  );
}

export default StoreCardList;