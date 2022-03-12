class Item < ApplicationRecord
  belongs_to :user
  enum name: { periodic_table: 0, principles_of_life: 1 }
end
