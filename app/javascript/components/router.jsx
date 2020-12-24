import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import App from './app'

document.addEventListener('DOMContentLoaded', ()=>{
  ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
  );
})
