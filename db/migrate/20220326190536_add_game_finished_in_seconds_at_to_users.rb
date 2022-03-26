class AddGameFinishedInSecondsAtToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :game_finished_in_seconds, :integer

    User.all.find_each {|user| user.update!({ game_finished_in_seconds: user.game_finished_at.to_i - user.created_at.to_i }) if user.game_finished_at.present?}
  end
end
