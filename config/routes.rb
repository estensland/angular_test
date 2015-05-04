Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resources :task_lists, only: [:index] do
      resources :tasks, only: [:index, :create, :update, :destroy]
    end
  end
end
