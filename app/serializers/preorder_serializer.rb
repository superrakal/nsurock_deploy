class PreorderSerializer < ActiveModel::Serializer
  attributes :id, :drink_preorder_ids, :food_preorder_ids, :comments, :created_at, :status, :number, :user_id, :total_price, :discount_count

  def total_price
    @object.total_price
  end

  def discount_count
    @object.discount_count
  end

end
