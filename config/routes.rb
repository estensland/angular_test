Rails.application.routes.draw do

  scope "api", defaults: {format: :json} do
    resources :posts
  end
  # Actual routing is happening in the Angular router
  root to: "welcome#index", anchor: false
end
