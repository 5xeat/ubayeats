import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./app.scss";

// components
import Home from "./views/Home";
import Login from "./views/Login";

const routes = [
  {
    route: "/",
    id: 0,
    component: Home,
  },
  {
    route: "/users/sign_up",
    id: 1,
    component: Login,
  },
];

const App = (props) => {
  const { history } = props;

  const handleRouteClick = (route) => {
    history.push(route);
  };

  return (
    <div className="app">
      <div className="nav">
        <span className="nav-item" onClick={() => handleRouteClick("/")}>
          Home
        </span>
        <span
          className="nav-item"
          onClick={() => handleRouteClick("/users/sign_up")}
        >
          Login
        </span>
      </div>
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
