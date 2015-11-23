module Api
  module V1
    class PreordersController < ApplicationController

      respond_to :json

      def index
        @preorders = Preorder.where(:status => 'Изготовляется').desc(:created_at)
        respond_with @preorders
      end

      def show
        @preorder  = Preorder.find params[:id]
        respond_with @preorder
      end

      def vk_send_message(message)
        logger.info message
        http = Net::HTTP.new("api.vkontakte.ru", 443)
        http.use_ssl = true
        logger.info http.request(Net::HTTP::Get.new("/method/messages.send?domain=nsu_topolnyak&message=#{message}&access_token=5e0c5cc8543a5dbecc47126eb0c0db8bac81875cce6ac4ec78c5dd90df41cda0300e600e9b6b1e482d43b"))
      end

      def new
        @preorder = Preorder.find params[:id]
        @preorder.status = 'Изготовляется'
        if @preorder.save
          vk_send_message(@preorder.new_preorder_message)
          respond_with @preorder, status: 200
        end
      end

      def create
        @will_destroyed_preorders = Preorder.where(user: current_user, status: 'Создан')
        @will_destroyed_preorders.each do |preorder|
          preorder.destroy
        end
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