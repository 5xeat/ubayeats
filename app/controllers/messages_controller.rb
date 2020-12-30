class MessagesController < ApplicationController
  def create
    @message = current_user.messages.new(message_params)
    @message.save
    redirect_to request.referrer
  end

  private
  def message_params
    params.require(:message).permit(:content, :room_id)
  end
end
