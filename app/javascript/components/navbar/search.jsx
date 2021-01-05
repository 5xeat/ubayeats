import React, {useState, useEffect} from "react";
import Rails from '@rails/ujs';
import "./search.scss";

function Search({user}){
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

  let selectedSuggestionsIndex = -1

  const atKeyPress = (e) => {
    const input = document.querySelector('.search-input')
    const result_list = document.querySelector('.result-list')
    let keyword = input.value
    if (e.key === 'Enter'){
      if (selectedSuggestionsIndex >= 0){
        keyword = document.querySelector('.result.selected').textContent
        input.value = keyword
        result_list.classList.add('hidden')
        selectedSuggestionsIndex = -1
        Turbolinks.visit(`/stores/search?keyword=${keyword}`)
      }
      Turbolinks.visit(`/stores/search?keyword=${keyword}`)
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
        input.value = keyword
        result_list.classList.add('hidden')
        Turbolinks.visit(`/stores/search?keyword=${keyword}`)
      })
    })
    if (inputValue === ''){
      result_list.innerHTML = ''
    }
  }

  return(
    <div className="search">
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