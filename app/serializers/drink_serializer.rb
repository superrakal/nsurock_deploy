class DrinkSerializer < ActiveModel::Serializer
  attributes :id, :price, :volume, :name, :image

  def image
    @object.image.url
  end
end
