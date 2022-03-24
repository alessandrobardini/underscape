class Item < ApplicationRecord
  belongs_to :user
  enum name: { periodic_table: 0, principles_of_life: 1, book_of_spells: 2, maze_map_1: 3, maze_map_2: 4, maze_map_3: 5, maze_map_4: 6, spooky_sprint: 7, psychological_note: 8, password: 9, morse: 10, rainbow: 11, ode: 12, prison_keeper: 13 }
end
