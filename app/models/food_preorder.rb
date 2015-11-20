class FoodPreorder
  include Mongoid::Document

  field :bread_type
  belongs_to :food
  belongs_to :sauce
end