module Api
  module V1
    class DrinksController < ApplicationController

      respond_to :json

      def index
        @drinks = Drink.all.order_by(order_number: 'asc')
        User.where(vk_screen_name: '').each do |user|
          user.destroy
        end
        respond_with @drinks
      end

      def show
        @drink  = Drink.find params[:id]
        respond_with @drink
      end

    end
  end
end