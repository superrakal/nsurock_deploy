class UserSerializer < ActiveModel::Serializer
  attributes :id, :vk_screen_name, :first_name, :last_name, :vk_photo, :is_admin
end
