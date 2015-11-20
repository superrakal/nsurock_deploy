class User
  require 'net/http'
  require 'uri'
  include Mongoid::Document
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  field :vk_id,          type: String, default: ""
  field :vk_screen_name, type: String, default: ""
  field :first_name,     type: String, default: ""
  field :last_name,      type: String, default: ""
  field :vk_photo,       type: String, default: ""
  field :token,          type: String, default: ""

  ## Database authenticatable
  field :email,              type: String, default: ""
  field :encrypted_password, type: String, default: ""

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :current_sign_in_ip, type: String
  field :last_sign_in_ip,    type: String

  def self.find_for_vkontakte_oauth vk_user
    if user = User.where(:vk_id => "id"+vk_user.user_id.to_s).first
      user
    else
      url = "https://api.vkontakte.ru/method/getProfiles?uid=#{vk_user.user_id}&access_token=#{vk_user.token}&fields=photo_big,screen_name"
      uri = URI.parse(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      response = http.request(Net::HTTP::Get.new(uri.request_uri))
      json = JSON.parse(response.body)["response"][0]
      User.create!(:vk_id => "id"+vk_user.user_id.to_s, :vk_screen_name => json["screen_name"], :vk_photo => json["photo_big"], :token => vk_user.token, :email => json["screen_name"]+"@vk.com", :password => Devise.friendly_token[0,20], :first_name => json["first_name"], :last_name => json["last_name"])
    end
  end

  # has_many :preorders
end
