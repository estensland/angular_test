class Task < ActiveRecord::Base
  belongs_to :list
  belongs_to :category
end