# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json, only: [:create, :destroy]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  def open_bag
    user = User.find_by(bag_code: params[:bag_code])
    redirect_to '/app' and return unless user
    sign_in(user)
    redirect_to '/app/bag'
  end

  def exists
    user = User.find_by(name: params['user']['name'])
    render json: { exists: user.present? }
  end

  def signed_in_user
    if user_signed_in?
      render json: { 
        user: current_user,
        items: current_user.items.order('created_at DESC'),
        answers: current_user.answers,
        bosses: current_user.bosses,
        progress: current_user.progress,
        game_ends_at: current_user.time_for_beating_the_game,
        game_finished_in_seconds: current_user.game_finished_in_seconds
      }
    else
      render json: { ok: false }, status: :unauthorized
    end
  end

  def winners
    render json: { winners: User.where.not(game_finished_at: nil).order('game_finished_in_seconds') }
  end
end
