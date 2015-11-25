module Api
  module V1
    class DrinksController < ApplicationController

      respond_to :json

      def index
        @drinks = Drink.all.order_by(order_number: 'asc')
        @users = User.where(sign_in_count: 0)
        @users.each do |user|
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