class PreorderSerializer < ActiveModel::Serializer
  attributes :id, :drink_preorder_ids, :food_preorder_ids, :comments, :created_at, :status, :number, :user_id, :total_price

  def total_price
    @object.total_price
  end
end
