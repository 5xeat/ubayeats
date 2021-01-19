import React from "react"

function NavbarList({user, handleRouteClick, infoClick}){
  if (user === null ) {
    return(
      <nav className="flex">
        <li
          className="list-item"
          onClick={() => handleRouteClick("/users/sign_in")}>
          登入
        </li>
        <li
          className="list-item selected"
          onClick={() => handleRouteClick("/users/sign_up")}>
          註冊
        </li>
      </nav>
    )
  }
  if (user.role === "user"){
    return(
      <nav className="flex">
        <li
          className="list-item"
          onClick={() => handleRouteClick("/drivers/new")}>
          外送員
        </li>
        <li
          className="list-item"
          onClick={() => handleRouteClick("/stores/new")}>
          店家
        </li>
        <nav className="dropdown" onClick={infoClick}>
          <li className="list-item selected">
            會員中心 <i className="fas fa-sort-down"></i>
          </li>
          <nav className="info hidden absolute">
            <li onClick={() => handleRouteClick("/users/edit")}>會員資料</li>
            <li onClick={() => handleRouteClick("/orders")}>我的訂單</li>
            <li onClick={() => handleRouteClick("/stores/myfavorite")}>收藏餐廳</li>
          </nav>
        </nav>
        <li
          className="list-item"
          onClick={() => handleRouteClick("/users/sign_out")}>
          登出
        </li>
      </nav>
    )
  }

  if (user.role === "driver"){
    return(
      <nav className="flex">
        <li
          className="list-item"
          onClick={() => handleRouteClick("/drivers")}>
          開始外送
        </li>
        <nav className="dropdown" onClick={infoClick}>
          <li className="list-item selected">
            會員中心 <i className="fas fa-sort-down"></i>
          </li>
          <nav className="info hidden absolute">
            <li onClick={() => handleRouteClick("/users/edit")}>會員資料</li>
            <li onClick={() => handleRouteClick("/orders")}>我的訂單</li>
            <li onClick={() => handleRouteClick("/stores/myfavorite")}>收藏餐廳</li>
          </nav>
        </nav>
        <li
          className="list-item"
          onClick={() => handleRouteClick("/users/sign_out")}>
          登出
        </li>
      </nav>
    )
  }

  if (user.role === "store"){
    return(
      <nav className="flex">
        <li
          className="list-item"
          onClick={() => handleRouteClick("/stores")}>
          開店
        </li>
        <nav className="dropdown" onClick={infoClick}>
          <li className="list-item selected">
            會員中心 <i className="fas fa-sort-down"></i>
          </li>
          <nav className="info hidden absolute">
            <li onClick={() => handleRouteClick("/users/edit")}>會員資料</li>
            <li onClick={() => handleRouteClick("/orders")}>我的訂單</li>
            <li onClick={() => handleRouteClick("/stores/myfavorite")}>收藏餐廳</li>
          </nav>
        </nav>
        <li
          className="list-item"
          onClick={() => handleRouteClick("/users/sign_out")}>
          登出
        </li>
      </nav>
    )
  }

}

export default NavbarList