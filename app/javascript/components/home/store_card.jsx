import React, {useState, useEffect} from 'react'
import "./home.scss";

function StoreCard({store_name, store_photo, store_type, place_id, id, onClick}){
  const [data, setData] = useState('?')
  
  useEffect(() => {
    const map = new google.maps.Map(document.createElement( 'div' ));
    const service = new google.maps.places.PlacesService(map)
    service.getDetails({
      placeId: place_id,
      fields: [ 'rating', 'review' ]
    }, callback)
  }, [])

  const callback = (place, status) => {
    if ( status == google.maps.places.PlacesServiceStatus.OK ) {
      setData(place.rating)
    }
  }

  return(
      <div className="card" onClick={()=>onClick(id)}>
        <div className="image">
          <img src={store_photo.url} alt=""/>
        </div>
        <div className="text">
          <div className="title">
            <p className="name">{store_name}</p>
            <div className="rate">
              <div className="img">
                <img src={require("../../images/google_icon.png")} alt="google"/> 
              </div>
              {data}<i className="fas fa-star"></i>
            </div>
          </div>
          <p className="type">{store_type}</p>
          <div className="heart">
            <i className="far fa-heart"></i>
          </div>
        </div>
      </div>
  );
}

export default StoreCard;