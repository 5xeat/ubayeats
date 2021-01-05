import React, {useState, useEffect} from "react";
import Rails from '@rails/ujs'

import "./home.scss";

// components
import StoreCard from './store_card.jsx'

function StoreCardList(){

  const [data, setData] = useState([])

  useEffect(() => {
    Rails.ajax({
      url: "/stores/recommand.json",
      type: "GET",
      success: (resp) => {
        setData(resp)
      },
      error: function(err) {
        console.log(err)
      }
    })
  }, [])  

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