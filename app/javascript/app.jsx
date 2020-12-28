import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./app.scss";

// components
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";

const routes = [
  {
    route: "/",
    id: 0,
    component: Home,
  },
  {
    route: "/users/sign_in",
    id: 1,
    component: Login,
  },
  {
    route: "/users/sign_up",
    id: 2,
    component: Signup,
  },
];

function App(props){
  const { history } = props;

  const handleRouteClick = (route) => {
    if (
      (route === '/users/sign_in' || history.location.pathname === '/users/sign_in') || 
      (route === '/users/sign_up' || history.location.pathname === '/users/sign_up')
    ){
      history.push(route);
      history.go()
      return
    }
    history.push(route);
  };

  return (
    <div className="app">
      <ul className="nav">
        <li onClick={() => handleRouteClick("/")}>
          <div className="logo">
            <img src={require("./images/logo/logo-white.png")} alt=""/>
          </div>
        </li>
        <span>
          <li
            className="nav-item"
            onClick={() => handleRouteClick("/users/sign_in")}
          >
            登入
          </li>
          <li
            className="nav-item"
            onClick={() => handleRouteClick("/users/sign_up")}
          >
            註冊
          </li>
        </span>
      </ul>
      <Switch>
        {routes.map(({ route, component, id }) => (
          <Route
            path={route}
            component={component}
            key={id}
            exact
            sensitive
            {...props}
          />
        ))}
      </Switch>
    </div>
  );
};

export default withRouter(App);
