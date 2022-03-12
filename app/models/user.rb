class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable,
         :recoverable, :rememberable

  validates :name, presence: true, uniqueness: true

  TIME_FOR_BEATING_THE_GAME = 1.hour

  has_many :items, dependent: :destroy
end
