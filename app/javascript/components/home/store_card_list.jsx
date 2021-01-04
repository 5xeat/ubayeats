import React, {useEffect} from "react";
import Rails from '@rails/ujs'

import "./home.scss";

// components
import StoreCard from './store_card.jsx'
import { useState } from 'react/cjs/react.development';

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
  

  return(
    <div className="store-card-list">
      {
        data.map((item) => {
          return(
            <StoreCard 
              {...item}
              key={item.id}
            />
          )
        })
      }
    </div>
  );
}

export default StoreCardList;