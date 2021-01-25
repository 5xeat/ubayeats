import React, {useState, useEffect} from 'react'
import "./home.scss";

function StoreCard({store_name, store_photo, description, place_id, id, favorite, atCardClick, atHeartClick}){
  const [data, setData] = useState('?')
  
  useEffect(() => {
    if (store_name !== null){
      const map = new google.maps.Map(document.createElement( 'div' ));
      const service = new google.maps.places.PlacesService(map)
      service.getDetails({
        placeId: place_id,
        fields: [ 'rating', 'review' ]
      }, callback)  
    }
  }, [store_name])

  const callback = (place, status) => {
    if ( status == google.maps.places.PlacesServiceStatus.OK ) {
      setData(place.rating)
    }
  }

  return(
      <div className="card" onClick={store_name ? ()=>atCardClick(id) : ()=>{}}>
        <div className="image">
          <img src={store_photo && store_photo.url} alt=""/>
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
          <p className="description">{description}</p>
          <div className="heart" onClick={store_name ? (e)=>atHeartClick(e, id) : ()=>{}}>
            <i className={favorite ? 'fas fa-heart':'far fa-heart'}></i>
          </div>
        </div>
      </div>
  );
}

export default StoreCard;