# frozen_string_literal: true

class BossesController < AppController
  before_action :authenticate_user!

  def create
    boss = Boss.new({ user_id: current_user.id, name: params[:boss][:name]})
    # last boss
    current_user.update!({ game_finished_at: Time.zone.now }) if params[:boss][:name] == 'goat'
    if boss.save
      render json: { ok: true }
    else
      render json: { errors: boss.errors.full_messages }, status: :unprocessable_entity
    end
  end
end