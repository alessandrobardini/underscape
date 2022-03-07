Rails.application.routes.draw do
  devise_for :teams, controllers: {
    sessions: 'teams/sessions'
  }

  devise_scope :team do
    get '/teams/sessions/signed_in' => 'teams/sessions#signed_in_team'
  end

  root to: 'app#show'

  get '/app(/*page)', to: 'app#show', as: 'app'
end
