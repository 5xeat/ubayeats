import React, {useState, useEffect} from "react";
import Rails from '@rails/ujs';
import "./search.scss";

function Search({user, onClick}){
  const [data, setData] = useState([])
  const [currentPos, setCurrentPos] = useState({latitude: null, longitude: null})
  
  useEffect(() => { 
    geoFindMe()
  }, [])

  const geoFindMe = () => {
    function success(position) {   
      let latitude  = position.coords.latitude;
      let longitude = position.coords.longitude;
      let href = window.location.href

      setCurrentPos({latitude: latitude, longitude: longitude})
      
      Rails.ajax({
        url: '/distance_filter',
        type: 'post',
        data: new URLSearchParams({latitude: latitude, longitude: longitude, href: href}),
        success: (resp) => {
          setData(resp)
        },
        error: function(err) {
        }
        })
    }
    function error() {
      console.log('無法取得您的目前位置');
      Rails.ajax({
        url: "/stores/recommand.json",
        type: "GET",
        success: (resp) => {
          setData(resp)
        },
        error: function(err) {
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
        }
      }) 
    } else {
      console.log('正在取得定位…!');
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  let selectedSuggestionsIndex = -1

  const atKeyPress = (e) => {
    const input = document.querySelector('.search-input')
    const result_list = document.querySelector('.result-list')

    let latitude  = currentPos.latitude;
    let longitude = currentPos.longitude;
    
    let keyword = input.value
    if (e.key === 'Enter'){
      if (selectedSuggestionsIndex >= 0){
        keyword = document.querySelector('.result.selected').textContent
        input.value = keyword
        result_list.classList.add('hidden')
        selectedSuggestionsIndex = -1
      }
      Turbolinks.visit(`/stores/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`)
    }
  }

  const atKeyUp = (e) => {
    const input = document.querySelector('.search-input')
    const inputValue = e.target.value
    const result_list = document.querySelector('.result-list')
    result_list.classList.remove('hidden')

    if (e.key === "ArrowDown" ){
      selectedSuggestionsIndex = (selectedSuggestionsIndex < result_list.children.length - 1) ? selectedSuggestionsIndex + 1 : selectedSuggestionsIndex

      if (selectedSuggestionsIndex > 0){
        result_list.children[selectedSuggestionsIndex - 1].classList.remove('selected')
      }
      if (result_list.children.length > 0){
        result_list.children[selectedSuggestionsIndex].classList.add('selected')
      }
      return
    }

    if (e.key === "ArrowUp" ){
      selectedSuggestionsIndex = (selectedSuggestionsIndex > 0 ) ? selectedSuggestionsIndex - 1 : 0

      if (selectedSuggestionsIndex >= 0){
        result_list.children[selectedSuggestionsIndex + 1].classList.remove('selected')
      }
      if (result_list.children.length > 0){
        result_list.children[selectedSuggestionsIndex].classList.add('selected')
      }
      return
    }
  
    result_list.innerHTML = ''
    const suggestions = data.filter((store) => {
      return (
        store.store_name.toLowerCase().includes(inputValue.toLowerCase())
      )
    })
    suggestions.forEach((suggestion) => {
      
      const result = document.createElement('div')
      result.classList.add('result')
      result.textContent = suggestion.store_name
      result_list.appendChild(result)
      result.addEventListener('click', (e) => {
        const keyword = e.target.textContent
        let latitude  = position.coords.latitude;
        let longitude = position.coords.longitude;
        navigator.geolocation.getCurrentPosition(success, error);
        input.value = keyword
        result_list.classList.add('hidden')
        Turbolinks.visit(`/stores/search?keyword=${keyword}&latitude=${latitude}&longitude=${longitude}`)
      })
    })
    if (inputValue === ''){
      result_list.innerHTML = ''
    }
  }

  return(
    <div className="search" onClick={onClick}>
      <i className="fas fa-search search-icon"></i>
      <input 
        className="search-input" 
        type="text" 
        placeholder={user === null ? "今天想吃什麼？" : user.name + "，今天想吃什麼？"}
        onKeyUp={atKeyUp}
        onKeyPress={atKeyPress}
        />
      <div className="result-list" />
    </div>
  )
}

export default Search