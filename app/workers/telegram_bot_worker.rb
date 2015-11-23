require 'telegram/bot'

class TelegramBotWorker
  include Sidekiq::Worker

  TOKEN = '151665154:AAE3jZDv0f-T7RIVZHUuMtoL03O_nLMbiHw'
  CHANNEL = '88916653'

  def perform_async(message)
    Telegram::Bot::Client.run(TOKEN) do |bot|
      bot.api.send_message(chat_id: CHANNEL, text: message)
    end
  end
end