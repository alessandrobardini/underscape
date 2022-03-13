# frozen_string_literal: true

class AnswersController < AppController
  before_action :authenticate_user!

  def create
    is_correct = Answer::ANSWERS_BY_RIDDLE[params[:riddle].to_sym] == params[:answer].strip
    if is_correct
      answer = Answer.new({ user_id: current_user.id, riddle: params[:riddle]})
      if answer.save
        render json: { ok: true }
      else
        render json: { errors: answer.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { ok: false }
    end
  end
end
