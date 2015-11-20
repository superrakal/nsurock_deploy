class DrinkPreorder
  include Mongoid::Document

  belongs_to :drink
  has_and_belongs_to_many :syurups
end