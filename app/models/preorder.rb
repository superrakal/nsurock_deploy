require 'autoinc'

class Preorder
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Autoinc

  field :comments
  field :status, default: 'Создан'
  field :number, type: Integer

  has_and_belongs_to_many :drink_preorders
  has_and_belongs_to_many :food_preorders
  belongs_to :user
  increments :number, model_name: 'Preorder'
  index number: 1

  def total_price
    total_price = 0
    self.drink_preorders.each do |drink_preorder|
      total_price = total_price + drink_preorder.drink.price
      if drink_preorder.syurups.count > 1
        total_price = total_price + 20
      end
    end
    self.food_preorders.each do |food_preorder|
      total_price = total_price + food_preorder.food.price
    end
    total_price
  end

  validates_uniqueness_of :number
end