# frozen_string_literal: true

class AnswersController < AppController
  before_action :authenticate_user!

  ANSWERS = {
    alchemist_cave: [
      # ReSPoNSiBiLiTiEs
      '7516847148332299'
  }

  def check
    is_correct = ANSWERS[params[:riddle].to_sym] == params[:answer].strip
    render json: { ok: is_correct }
  end
end
