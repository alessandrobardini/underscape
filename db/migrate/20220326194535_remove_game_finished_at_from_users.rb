class RemoveGameFinishedAtFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :game_finished_at
  end
end
