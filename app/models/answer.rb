class Answer < ApplicationRecord
  belongs_to :user
  enum riddle: { alchemist_cave: 0, morse: 1 }

  ANSWERS_BY_RIDDLE = {
    # ReSPoNSiBiLiTiEs
    alchemist_cave: '7516847148332299',
    fog: 'past'
  }
end
