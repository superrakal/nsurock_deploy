VkontakteApi.configure do |config|
  # Authorization parameters (not needed when using an external authorization):
  if Rails.env.development?
    config.app_id       = '5152341'
    config.app_secret   = 'xc42IFMXPVVXwerfEiWm'
    config.redirect_uri = 'http://local.vcap.me:3000/welcome/vk_auth_callback'
  else
    config.app_id       = '4414019'
    config.app_secret   = '1NckkqCXbQgcUAd4b3XM'
    config.redirect_uri = 'http://nsurock.ru/welcome/vk_auth_callback'
  end
  config.logger = Rails.logger
end
