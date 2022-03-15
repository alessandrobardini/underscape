class CreateBosses < ActiveRecord::Migration[6.1]
  def change
    create_table :bosses do |t|
      t.integer :name, default: 0
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
