class RemoveTeams < ActiveRecord::Migration[6.1]
  def change
    drop_table :teams
  end
end
