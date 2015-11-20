class Food
  include Mongoid::Document
  include Mongoid::Paperclip

  field :name
  field :price,  type: Integer
  has_mongoid_attached_file :image,
                            :styles => {
                                :original => ['640x480', :jpg],
                                :small => ['200x150', :jpg]
                            }

  validates_attachment_content_type :image, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]
end