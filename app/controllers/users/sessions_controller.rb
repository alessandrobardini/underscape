# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy, :exists]

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

  def exists
    user = User.find_by(name: params['user']['name'])
    render json: { exists: user.present? }
  end

  def signed_in_user
    if user_signed_in?
      render json: { user: current_user, game_ends_at: current_user.created_at + User::TIME_FOR_BEATING_THE_GAME }
    else
      render json: { ok: false }, status: :unauthorized
    end 
  end
end
