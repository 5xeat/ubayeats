import React, {useState} from "react";
import ReactDOM from "react-dom";
import Rails from '@rails/ujs'

import "./navbar.scss";

// components
import NavbarList from "../../components/navbar/navbar_list.jsx"

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

    Turbolinks.visit(route)
  }

  return (
    <ul className="nav">
      <li className="bars" onClick={sidebar}>
        {
          sideBar ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>
        }
      </li>
      <li className="logo" onClick={() => handleRouteClick("/")}>
        <img src={require("../../images/logo/logo-white.png")} alt=""/>
      </li>
        { user === null ||
          <div className="search">
            <i className="fas fa-search search-icon"></i>
            <input className="search-input" type="text" placeholder={user.name + "，今天想吃什麼？"}>
            </input>
          </div>
        }
        { user === null &&
          <div className="search">
            <i className="fas fa-search search-icon"></i>
            <input className="search-input" type="text" placeholder="今天想吃什麼？">
            </input>
          </div>
        }
        <div className={sideBar ? 'list list-down' : 'list list-up'}>
          <NavbarList user={user} handleRouteClick={handleRouteClick}/>
        </div>
    </ul>
  );
};

document.addEventListener('turbolinks:load', () => {
  const node = document.getElementById('navbar')
  const data = JSON.parse(node.getAttribute('data'))
  console.log(data);

  ReactDOM.render(
    <Navbar user={data}/>,
    document.getElementById('navbar_component')
  );
});
