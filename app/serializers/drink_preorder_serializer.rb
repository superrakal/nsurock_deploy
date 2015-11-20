class DrinkPreorderSerializer < ActiveModel::Serializer
  attributes :id, :drink_id, :syurup_ids
end
