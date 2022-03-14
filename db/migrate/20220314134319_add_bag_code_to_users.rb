class AddBagCodeToUsers < ActiveRecord::Migration[6.1]
  def change
    change_table :users do |t|
      t.string :bag_code
    end
  end
end
