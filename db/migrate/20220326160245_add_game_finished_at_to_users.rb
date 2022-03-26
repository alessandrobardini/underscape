class AddGameFinishedAtToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :game_finished_at, :timestamp
  end
end
