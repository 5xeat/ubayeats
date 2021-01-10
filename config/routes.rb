Rails.application.routes.draw do
  root 'home#index'

  devise_for :users, controllers: { 
    omniauth_callbacks: "users/omniauth_callbacks",
    registrations: "users/registrations",
    sessions: "users/sessions"
  }

  devise_scope :user do
    post "/unique_email", to: "users/registrations#unique_email?"
    get "/users/info", to: "users/registrations#info"
  end
  
  resources :orders do 
    collection do
      post :recieving_update
      post :preparing_update
      post :delivering_update
      post :record_update
      get :recieving
      get :preparing
      get :delivering
      get :record
    end
  end

  resource :carts do 
    post 'add_item/:id', action: 'add_item', as: 'add_item'
    post 'minus_item/:id', action: 'minus_item', as: 'minus_item'
    delete 'remove_item/:id', action: 'remove_item', as: 'remove_item'
  get :checkout
    collection do
      post :pay
      get :confirm
    end
  end

  resources :rooms
  resources :messages

  resource :driver_profiles, path: '/drivers', only: [:new, :create, :edit, :update] do
    get :index
  end

  resource :store_profiles, path: '/stores'

  resources :store_profiles, as: 'stores', path: '/stores', only: [] do
    member do
      get :delicacy
    end
    collection do
      get :recommand
      get :search
      resources :products, shallow: true do
        member do
          patch :toggle_publish
        end
      end
    end
  end
end
