module Api
  module V1
    class SaucesController < ApplicationController

      respond_to :json

      def index
        @sauces = Sauce.all.order_by(name: 'asc')
        respond_with @sauces
      end

      def show
        @sauce  = Sauce.find params[:id]
        respond_with @sauce
      end

    end
  end
end