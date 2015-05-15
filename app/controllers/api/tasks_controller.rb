class Api::TasksController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception

  def index
    list = List.find(params['list_id'])
    render json: {list: list, tasks: list.tasks.includes(:category), categories: Category.all}, status: 200
  end

  def create
    list = List.find(params['list_id'])
    task = list.tasks.create!(safe_params)
    render json: task, status: 201
  end

  def update
    task = Task.find(params['id'])
    task.update_attributes(safe_params)
    render nothing: true, status: 204
  end

  def destroy
    task = Task.find(params['id'])
    task.destroy
    render nothing: true, status: 204
  end

  def safe_params
    params.require(:task).permit(:text, :list_id, :completed)
  end
end