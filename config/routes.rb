Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }

  devise_scope :user do
    get '/users/sessions/signed_in' => 'users/sessions#signed_in_user'
    post '/users/sessions/exists' => 'users/sessions#exists'
  end

  root to: 'app#show'

  get '/app(/*page)', to: 'app#show', as: 'app'
end
