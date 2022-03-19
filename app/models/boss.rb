class Boss < ApplicationRecord
  belongs_to :user
  enum name: { alchemist: 0, ghost: 1 }
end
