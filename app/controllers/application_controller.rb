class ApplicationController < ActionController::Base
  after_action :send_csrf_token_in_cookie

  private def send_csrf_token_in_cookie
    cookies['CSRF-Token'] = form_authenticity_token if form_authenticity_token.present?
  end
end
