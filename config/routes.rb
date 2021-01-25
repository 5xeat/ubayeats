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
  
  resources :orders do 
    collection do
      post :receiving_update
      post :preparing_update
      post :delivering_update
      post :record_update
      get :receiving
      get :preparing
      get :delivering
      get :record
      post :driver_take_order
      post :update_driver_position
      post :display_driver_position
    end
  end

  resource :carts do 
    post 'add_item/:id', action: 'add_item', as: 'add_item'
    post 'cart_add_item/:id', action: 'cart_add_item', as: 'cart_add_item'
    post 'minus_item/:id', action: 'minus_item', as: 'minus_item'
    post 'change_quantity/:id', action: 'change_quantity', as: 'change_quantity'
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
    get :order_deliver
    post :online
  end
  
  resource :store_profiles, path: '/stores'
  
  resources :store_profiles, as: 'stores', path: '/stores', only: [] do
    member do
      get :delicacy
      post :favorite
    end
    collection do
      post :all_store
      post :recommand
      post :distance_filter
      get :search
      get :myfavorite
      resources :products, shallow: true do
        member do
          patch :toggle_publish
        end
      end
    end
  end
end
