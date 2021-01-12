import React from "react"

function NavbarList({user, handleRouteClick}){
  if (user === null ) {
    return(
      <div className="flex">
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
      </div>
    )
  }
  if (user.role === "user"){
    return(
      <div className="flex">
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
        <li
          className="list-item selected"
          onClick={() => handleRouteClick("/users/info")}>
          會員中心
        </li>
        <li
          className="list-item"
          onClick={() => handleRouteClick("/users/sign_out")}>
          登出
        </li>
      </div>
    )
  }

  if (user.role === "driver"){
    return(
      <div className="flex">
        <li
          className="list-item"
          onClick={() => handleRouteClick("/drivers")}>
          開始外送
        </li>
        <li
          className="list-item selected"
          onClick={() => handleRouteClick("/users/info")}>
          會員中心
        </li>
        <li
          className="list-item"
          onClick={() => handleRouteClick("/users/sign_out")}>
          登出
        </li>
      </div>
    )
  }

  if (user.role === "store"){
    return(
      <div className="flex">
        <li
          className="list-item"
          onClick={() => handleRouteClick("/stores")}>
          開店
        </li>
        <li
          className="list-item selected"
          onClick={() => handleRouteClick("/users/info")}>
          會員中心
        </li>
        <li
          className="list-item"
          onClick={() => handleRouteClick("/users/sign_out")}>
          登出
        </li>
      </div>
    )
  }

}

export default NavbarList