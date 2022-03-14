Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }

  devise_scope :user do
    get '/users/sessions/signed_in' => 'users/sessions#signed_in_user'
    post '/users/sessions/exists' => 'users/sessions#exists'
    get '/bag/:bag_code' => 'users/sessions#open_bag'
  end

  resources :items, only: :create

  resources :answers, only: :create

  root to: 'app#show'

  get '/app(/*page)', to: 'app#show', as: 'app'
end
