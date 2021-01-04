Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: { 
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations",
    sessions: "users/sessions"
  }

  devise_scope :user do
    post "/unique_email", to: "users/registrations#unique_email?"
  end
  
  resource :stores do 
    resource :orders, only: [:new] do
      get :preparing
      get :delivering
      get :record
    end
    collection do
      get :index
      get :search
    end
  end
  resources :orders
  resource :carts do
    get :checkout
    collection do
      post :pay
      get :confirm
    end
  end
  # , only: [:show, :destroy] do
  #   post ':add_item/:id',aciton: 'add_item' 

  resources :rooms
  resources :messages
  resource :drivers do
    get :index
  end

  resources :stores, only: [] do
    member do
      get :delicacy
    end
  end

  resource :stores, only: [:show, :edit, :update] do
    collection do
      get :delicacy
    end
    resources :products, shallow: true, only: [:show, :new, :create, :edit, :update, :destroy] do
      collection do
        get :index
      end
      member do
        patch :toggle_publish
      end
    end
  end
end
