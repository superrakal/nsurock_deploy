module Api
  module V1
    class UsersController < ApplicationController

      respond_to :json

      def show
        @user = User.find params[:id]
        respond_with @user
      end

      def update
        @user = User.find params[:id]
        if @user.update user_params
          respond_with @user, status: :created, location: false
        else
          respond_with @user, status: :unprocessable_entity
        end
      end

      private
      def user_params
        params.require(:user).permit :is_banned
      end
    end
  end
end