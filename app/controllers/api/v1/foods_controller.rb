module Api
  module V1
    class FoodsController < ApplicationController

      respond_to :json

      def index
        @foods = Food.all
        respond_with @foods
      end

      def show
        @food  = Food.find params[:id]
        respond_with @food
      end

    end
  end
end