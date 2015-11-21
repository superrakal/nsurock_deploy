module Api
  module V1
    class PreordersController < ApplicationController

      respond_to :json

      def index
        @preorders = Preorder.all
        respond_with @preorders
      end

      def show
        @preorder  = Preorder.find params[:id]
        respond_with @preorder
      end

      def vk_send_message(message)
        http = Net::HTTP.new("api.vkontakte.ru", 443)
        http.use_ssl = true
        http.request(Net::HTTP::Get.new("/method/messages.send?domain=nsu_topolnyak&message=#{message}&access_token=5e0c5cc8543a5dbecc47126eb0c0db8bac81875cce6ac4ec78c5dd90df41cda0300e600e9b6b1e482d43b"))
      end

      def new
        @preorder = Preorder.find params[:id]
        @preorder.status = 'Изготовляется'
        if @preorder.save
          @will_destroyed_preorders = Preorder.where(user: current_user, status: 'Создан')
          @will_destroyed_preorders.each do |preorder|
            preorder.destroy
          end
          @message = "Новый+заказ!<br>Номер+заказа:+#{@preorder.number}<br>Заказчик:+#{@preorder.user.first_name}+#{@preorder.user.last_name}<br><br>"

          if @preorder.drink_preorders.count > 0
            @message = @message+"Напитки:<br>"
            @preorder.drink_preorders.each do |drink_preorder|
              с_drink = drink_preorder.drink.name.gsub!(/ /,"+").to_s
              if с_drink.length > 0
                drink=с_drink
              else
                drink = drink_preorder.drink.name
              end
              @message = @message+"--"+drink+";<br>"
              if drink_preorder.syurups.count > 0
                @message = @message+"----Сиропы:+"
                drink_preorder.syurups.each do |syurup|
                  c_syurup = syurup.name.gsub!(/ /,"+").to_s
                  if c_syurup.length > 0
                    syurup=c_syurup
                  else
                    syurup = syurup.name
                  end
                  @message = @message+syurup+";+"
                end
              end
              @message = @message+"<br><br>"
            end
          end

          if @preorder.food_preorders.count > 0
            @message = @message+"Закуски:<br>"
            @preorder.food_preorders.each do |food_preorder|
              food = food_preorder.food.name.gsub!(/ /,"+").to_s
              @message = @message+"--"+food+";<br>"
              @message = @message+"----Тип+хлеба:+"+food_preorder.bread_type.to_s+"<br>"
              if food_preorder.sauce.present?
                @message = @message+"----Соус:+"+food_preorder.sauce.to_s
              end
              @message = @message+"<br><br>"
            end
          end
          if @preorder.comments.present?
            comments = @preorder.comments.gsub!(/ /,"+").to_s
            if comments.length == 0
              comments = @preorder.comments.to_s
            end
            @message = @message + "Коментарии+к+заказу:+"+comments+"<br><br>"
          end
          @message = @message+"К+оплате:+"+@preorder.total_price.to_s+"+руб."
          vk_send_message(@message)
          respond_with @preorder, status: 200
        end
      end

      def create
        @preorder = Preorder.new preorder_params
        @preorder.user = current_user
        if @preorder.save
          respond_with @preorder, status: :created, location: false
        else
          respond_with @preorder, status: :unprocessable_entity
        end
      end

      def update
        @preorder = Preorder.find params[:id]
        if @preorder.update preorder_params
          respond_with @preorder, status: :created, location: false
        else
          respond_with @preorder, status: :unprocessable_entity
        end
      end

      private
      def preorder_params
        params.require(:preorder).permit :comments, :status, {drink_preorder_ids: []}, {food_preorder_ids: []}
      end

    end
  end
end