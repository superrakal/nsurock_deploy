class PreorderMailer < ApplicationMailer
  def new_preorder(preorder)
    @preorder = preorder
    mail charset: 'utf-8', to: 'ibragimov.farkhodzhon@gmail.com', subject:'Новый предзаказ'
  end

  def today_preorders
    @preorders = Preorder.where(:created_at.gte => Time.zone.now.beginning_of_day)
    mail charset: 'utf-8', to: 'ibragimov.farkhodzhon@gmail.com', subject:'Отчет'
  end
end