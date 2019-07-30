# frozen_string_literal: true

Rails.application.routes.draw do
  resources :ratings
  get 'myratings/:user_id' => 'ratings#my_ratings'
  get 'mystaticratings/:unique_url' => 'ratings#my_static_ratings'
  get 'mycurrentratings/:user_id' => 'ratings#my_last_rating'

  resources :categories
  devise_for :users, controllers: { registrations: 'users/registrations' }

  devise_scope :user do
    get 'user/:id' => 'users/registrations#one_user'
    get 'staticuser/:unique_url' => 'users/registrations#static_user'
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '*path', to: 'pages#index', constraints: ->(request) { request.format.html? }
  root to: 'pages#index'
end
