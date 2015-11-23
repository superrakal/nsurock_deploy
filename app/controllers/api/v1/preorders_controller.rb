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

      def new
        @preorder = Preorder.find params[:id]
        @preorder.status = 'Изготовляется'
        if @preorder.save
          TelegramBotWorker.new.perform_async(@preorder.new_preorder_message)
          respond_with @preorder, status: 200
        else
          respond_with @preorder, status: :unprocessable_entity
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