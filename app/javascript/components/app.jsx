import React from 'react';
import { Route } from 'react-router-dom';
import HomeIndex from './home#index/app'
import RegistrationNew from './registration#new/app'

const App =() => {
  return (
    <div>
      <Route path="/" exact component={HomeIndex} />
      <Route path="/users/sign_up" component={RegistrationNew} />
    </div>
  );
}

export default App;