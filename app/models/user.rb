class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable

  after_create :generate_bag_code

  validates :name, presence: true, uniqueness: true

  INITIAL_TIME_FOR_BEATING_THE_GAME = 1.hour
  BONUS_TIME_AFTER_DEFEATING_BOSS = 10.minutes

  has_many :items, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :bosses, dependent: :destroy

  def progress
    total_number_of_steps = Answer::riddles.size + Boss::names.size + Item::names.size
    (BigDecimal((self.answers + self.bosses + self.items).size) * 100 / total_number_of_steps).to_i
  end

  def time_for_beating_the_game
    self.created_at + INITIAL_TIME_FOR_BEATING_THE_GAME + (self.bosses.where.not(name: 'goat').size * BONUS_TIME_AFTER_DEFEATING_BOSS)
  end

  def game_finished_in_seconds
    self.game_finished_at - self.created_at if self.game_finished_at.present?
  end
  
  private def generate_bag_code
    self.bag_code = SecureRandom.alphanumeric
  end
end
