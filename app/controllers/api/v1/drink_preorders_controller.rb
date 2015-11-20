module Api
  module V1
    class DrinkPreordersController < ApplicationController

      respond_to :json

      def index
        @drink_preorders = DrinkPreorder.all
        respond_with @drink_preorders
      end

      def show
        @drink_preorder  = DrinkPreorder.find params[:id]
        respond_with @drink_preorder
      end

      def create
        @drink_preorder = DrinkPreorder.new preorder_params
        if @drink_preorder.save
          respond_with @drink_preorder, status: :created, location: false
        else
          respond_with @drink_preorder, status: :unprocessable_entity
        end
      end

      def update
        @drink_preorder = DrinkPreorder.new preorder_params
        if @drink_preorder.save
          respond_with @drink_preorder, status: :created, location: false
        else
          respond_with @drink_preorder, status: :unprocessable_entity
        end
      end

      def destroy
        @drink_preorder  = DrinkPreorder.find params[:id]
        @drink_preorder.destroy
        respond_with @drink_preorder
      end

      private
      def preorder_params
        params.require(:drink_preorder).permit :drink_id, {syurup_ids: []}
      end

    end
  end
end