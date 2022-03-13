class CreateAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.integer :riddle, default: 0
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
