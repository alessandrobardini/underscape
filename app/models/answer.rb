class Answer < ApplicationRecord
  belongs_to :user
  enum riddle: { alchemist_cave: 0 }

  ANSWERS_BY_RIDDLE = {
    # ReSPoNSiBiLiTiEs
    alchemist_cave: '7516847148332299'
  }
end
