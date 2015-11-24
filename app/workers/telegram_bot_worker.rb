require 'telegram/bot'

class TelegramBotWorker
  include Sidekiq::Worker

  TOKEN = '151665154:AAE3jZDv0f-T7RIVZHUuMtoL03O_nLMbiHw'

  def perform_async(message)
    Telegram::Bot::Client.run(TOKEN) do |bot|
      admins = Admin.all
      admins.each do |admin|
        if admin.telegram_channel.present?
          bot.api.send_message(chat_id: admin.telegram_channel, text: message)
        end
      end
    end
  end
end