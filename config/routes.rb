Rails.application.routes.draw do
  devise_for :users
  get 'welcome/vk_auth_callback'
  get 'welcome/auth_by_vk'
  get 'welcome/current_user_id'
  root 'welcome#index'
  get '/*path' => 'welcome#index', format: 'html'
end
