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
    total_price - (self.discount_count*25)
  end
  
  def new_preorder_message
    message = "Новый заказ! Номер заказа: #{self.number}. Заказчик: #{self.user.first_name} #{self.user.last_name}\n\n"
    if self.drink_preorders.count > 0
      message = message+"Напитки:\n"
      self.drink_preorders.each do |drink_preorder|
        с_drink = drink_preorder.drink.name
        if с_drink.length > 0
          drink=с_drink
        else
          drink = drink_preorder.drink.name
        end
        message = message+"--"+drink+";\n"
        if drink_preorder.syurups.count > 0
          message = message+"----Сиропы: "
          drink_preorder.syurups.each do |syurup|
            c_syurup = syurup.name
            if c_syurup.length > 0
              syurup=c_syurup
            else
              syurup = syurup.name
            end
            message = message+syurup+"; "
          end
        end
        message = message+"\n\n"
      end
    end
    if self.food_preorders.count > 0
      message = message+"Закуски:\n"
      self.food_preorders.each do |food_preorder|
        food = food_preorder.food.name
        message = message+"--"+food+";\n"
        if food_preorder.food.is_available_adds
          message = message+"----Тип хлеба: "+food_preorder.bread_type.to_s+"\n"
          if food_preorder.sauce.present?
            message = message+"----Соус: "+food_preorder.sauce.to_s
          end
        end
        message = message+"\n\n"
      end
    end
    if self.comments.present?
      comments = self.comments
      if comments.length == 0
        comments = self.comments.to_s
      end
      message = message + "Коментарии к заказу: "+comments+"\n\n"
    end
    message = message+"К оплате: "+self.total_price.to_s+" руб."
    return message
  end

  def discount_count
    if (self.drink_preorders.length > 0) && (self.food_preorders.length > 0)
      return [self.drink_preorders.length, self.food_preorders.length].min
    else
      return 0
    end
  end

  validates_uniqueness_of :number
end