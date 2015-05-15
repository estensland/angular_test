class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :text
      t.integer :list_id
      t.boolean :completed
      t.integer :category_id

      t.timestamps
    end
  end
end
