class FoodSerializer < ActiveModel::Serializer
  attributes :id, :price, :name, :image

  def image
    @object.image.url
  end
end
