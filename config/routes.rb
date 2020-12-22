Rails.application.routes.draw do
  devise_for :users, controllers: { 
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations" 
  }
  root 'home#index'
  resource :stores
  resource :drivers
end
