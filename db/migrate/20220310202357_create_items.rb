class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.integer :kind, default: 0
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
