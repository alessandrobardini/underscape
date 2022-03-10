class Item < ApplicationRecord
  belongs_to :user
  enum name: { periodic_table: 0 }
end
