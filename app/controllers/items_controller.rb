# frozen_string_literal: true

class ItemsController < AppController
  before_action :authenticate_user!

  def create
    item = Item.new({ user_id: current_user.id, name: params[:item][:name]})
    if item.save
      render json: { ok: true }
    else
      render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
