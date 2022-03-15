class Boss < ApplicationRecord
  belongs_to :user
  enum name: { alchemist: 0 }
end
