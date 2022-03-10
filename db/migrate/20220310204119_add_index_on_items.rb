class AddIndexOnItems < ActiveRecord::Migration[6.1]
  def change
    add_index :items, [:user_id, :kind], unique: true
  end
end
