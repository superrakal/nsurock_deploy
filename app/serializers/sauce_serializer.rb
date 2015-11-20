class SauceSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :is_available

  def image
    @object.image.url
  end
end
