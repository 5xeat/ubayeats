class RoomsController < ApplicationController
  def index
    @room = Room.find(params[:id])
  end

  def show
    @room = Room.find(params[:id])
    @rooms = Room.all
    render 'index'
  end
end
