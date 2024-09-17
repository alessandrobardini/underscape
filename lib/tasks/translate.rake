# frozen_string_literal: true

task translate: :environment do
  I18nJS.call(config_file: "config/i18n.yml")
end
