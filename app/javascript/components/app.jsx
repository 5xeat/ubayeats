import React from 'react';
import { Route } from 'react-router-dom';
import HomeIndex from './home#index/app'
import RegistrationsNew from './registrations#new/app'
import SessionsNew from './sessions#new/app'

const App =() => {
  return (
    <div>
      <Route path="/" exact component={HomeIndex} />
      <Route path="/users/sign_up" component={RegistrationsNew} />
      <Route path="/users/sign_in" component={SessionsNew} />
    </div>
  );
}

export default App;