import React, {useState} from "react";
import ReactDOM from "react-dom";
import Rails from '@rails/ujs'

import "./navbar.scss";

function Navbar({user}){
  console.log(user);

  const [sideBar, setSideBar] = useState(false)
  const sidebar = () => {
    setSideBar(!sideBar)
  }

  const handleRouteClick = (route) => {
    if (route === "/users/sign_out") {
      Rails.ajax({
        url: route,
        type: 'delete',
        success: (resp) => {
          window.location.href = '/'
        },
        error: function(err) {
          console.log(err)
        }
      })
      return
    }

    window.location.href = route
  }

  return (
    <ul className="nav">
      <li className="bars" onClick={sidebar}>
        {
          sideBar ? <i class="fas fa-times"></i> : <i className="fas fa-bars"></i>
        }
      </li>
      <li className="logo" onClick={() => handleRouteClick("/")}>
        <img src={require("../../images/logo/logo-white.png")} alt=""/>
      </li>
      <div className="flex">
        { user === null ||
          <div className="search">
            <input className="search-input" type="text" placeholder={user.name + "，今天想吃什麼？"}>
              
            </input>
          </div>
        }
        { user === null &&
          <div className="search">
            <input className="search-input" type="text" placeholder="今天想吃什麼？">
              
            </input>
          </div>
        }
        <div className={sideBar ? 'list list-down' : 'list list-up'}>
          { user === null ||
            <li
              className="list-item"
              onClick={() => handleRouteClick("/drivers/new")}
            >
              成為外送員
            </li>
          }
          { user === null ||
            <li
              className="list-item"
              onClick={() => handleRouteClick("/stores/new")}
            >
              開店
            </li>
          }
          { user === null ||
            <li
              className="list-item selected"
              onClick={() => handleRouteClick("/users/edit")}
            >
              會員資料
            </li>
          }
          { user === null ||
            <li
              className="list-item"
              onClick={() => handleRouteClick("/users/sign_out")}
            >
              登出
            </li>
          }
          { user === null &&
            <li
              className="list-item"
              onClick={() => handleRouteClick("/users/sign_in")}
            >
              登入
            </li>
          }
          { user === null &&
            <li
              className="list-item selected"
              onClick={() => handleRouteClick("/users/sign_up")}
            >
              註冊
            </li>
          }
        </div>
      </div>
    </ul>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  const node = document.getElementById('navbar')
  const data = JSON.parse(node.getAttribute('data'))
  console.log(data);

  ReactDOM.render(
    <Navbar user={data}/>,
    document.getElementById('navbar_component')
  );
});
