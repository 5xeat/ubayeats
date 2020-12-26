Rails.application.routes.draw do
  devise_for :users, controllers: { 
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations" 
  }
  root 'home#index'
  resource :stores
  resource :drivers

  resource :stores, only: [:show, :edit, :update] do
    get '/productlist', to: 'products#index'
    resources :products, shallow: true, only: [:show, :new, :create, :edit, :update, :destroy] do
    end
  end
end
