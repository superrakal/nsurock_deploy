module Api
  module V1
    class FoodPreordersController < ApplicationController

      respond_to :json

      def index
        @food_preorders = FoodPreorder.all
        respond_with @food_preorders
      end

      def show
        @food_preorder  = FoodPreorder.find params[:id]
        respond_with @food_preorder
      end

      def create
        @food_preorder = FoodPreorder.new preorder_params
        if @food_preorder.save
          respond_with @food_preorder, status: :created, location: false
        else
          respond_with @food_preorder, status: :unprocessable_entity
        end
      end

      def update
        @food_preorder = FoodPreorder.new preorder_params
        if @food_preorder.save
          respond_with @food_preorder, status: :created, location: false
        else
          respond_with @food_preorder, status: :unprocessable_entity
        end
      end

      def destroy
        @food_preorder  = FoodPreorder.find params[:id]
        @food_preorder.destroy
        respond_with @food_preorder
      end

      private
      def preorder_params
        params.require(:food_preorder).permit :food_id, :bread_type, :sauce_id
      end

    end
  end
end