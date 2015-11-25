class FoodSerializer < ActiveModel::Serializer
  attributes :id, :price, :name, :image, :is_available_adds

  def image
    @object.image.url
  end
end
