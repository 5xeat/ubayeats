import React, {useState, useEffect} from "react";
import Rails from '@rails/ujs';
import "./search.scss";


// const data = [
//   {
//     id: 1,
//     title: "天仁茗茶",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 2,
//     title: "五十嵐",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 3,
//     title: "麻古茶坊",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 4,
//     title: "可不可熟成紅茶",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 5,
//     title: "萬波",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
//   {
//     id: 6,
//     title: "Coco",
//     description: "珍奶好喝！",
//     image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
//   },
// ]



function Search({user}){
  const [data, setData] = useState([])

  useEffect(() => {
    Rails.ajax({
      url: "/stores.json",
      type: "GET",
      success: (resp) => {
        const newData = resp.stores
        setData(newData)
      },
      error: function(err) {
        console.log(err)
      }
    })
  }, [])

  const atChange = (e) => {
    const input = e.target.value
    const result_list = document.querySelector('.result-list')
  
    result_list.innerHTML = ''
    const suggestions = data.filter((store) => {
      return (
        store.name.includes(input)
      )
    })
    suggestions.forEach((suggestion) => {
      const result = document.createElement('div')
      result.classList.add('result')
      result.textContent = suggestion.name
      result_list.appendChild(result)
    })
    if (input === ''){
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
        onChange={atChange}
        />
      <div className="result-list" />
    </div>
  )
}

export default Search