import React, {useState} from "react";
import ReactDOM from "react-dom";
import Rails from '@rails/ujs'

import "./navbar.scss";

// components
import NavbarList from "../../components/navbar/navbar_list.jsx"
import Search from "../../components/navbar/search.jsx"

function Navbar({user}){

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

  const atClick = (e) => {
    if (screen.width < 768){
      e.currentTarget.classList.add('searchClick')
      const closeBtn = document.createElement('i')
      closeBtn.classList.add('fas')
      closeBtn.classList.add('fa-times')
      closeBtn.classList.add('closeBtn')
      closeBtn.onclick = () => {
        document.querySelector('.searchClick').classList.remove('searchClick')
        closeBtn.remove()
      }
      e.currentTarget.insertAdjacentElement('afterbegin', closeBtn)
    }
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
      <Search user={user} onClick={atClick}/>
      <div className={sideBar ? 'list list-down' : 'list list-up'}>
        <NavbarList user={user} handleRouteClick={handleRouteClick}/>
      </div>
    </ul>
  );
};

document.addEventListener('turbolinks:load', () => {
  const node = document.getElementById('navbar')
  const data = JSON.parse(node.getAttribute('data'))

  ReactDOM.render(
    <Navbar user={data}/>,
    document.getElementById('navbar_component')
  );
});
