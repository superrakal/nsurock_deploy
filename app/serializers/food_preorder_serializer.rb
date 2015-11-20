class FoodPreorderSerializer < ActiveModel::Serializer
  attributes :id, :food_id, :sauce_id, :bread_type
end
