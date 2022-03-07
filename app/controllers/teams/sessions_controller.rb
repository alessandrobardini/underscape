# frozen_string_literal: true

class Teams::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]

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

  def signed_in_team
    if team_signed_in?
      render json: { team: current_team }
    else
      render json: { ok: false }, status: :unauthorized
    end 
  end
end
