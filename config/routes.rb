Rails.application.routes.draw do

  devise_for :admins
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  namespace :api do
    namespace :v1 do
      resources :drinks,          only: [:index, :show]
      resources :syurups,         only: [:index, :show]
      resources :foods,           only: [:index, :show]
      resources :sauces,          only: [:index, :show]
      resources :users,           only: [:index, :show, :update]
      resources :preorders,       only: [:index, :show, :create, :update] do
        get  'new',               on: :collection
      end
      resources :drink_preorders
      resources :food_preorders
    end
  end

  devise_for :users
  get 'welcome/vk_auth_callback'
  get 'welcome/auth_by_vk'
  get 'welcome/current_user_id'
  root 'welcome#index'
  get '/*path' => 'welcome#index', format: 'html'
end
