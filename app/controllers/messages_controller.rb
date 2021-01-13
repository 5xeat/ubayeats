class MessagesController < ApplicationController
  def create
    @message = current_user.messages.new(message_params)
    @message.save
    SendMessageJob.perform_later(@message)
    ActionCable.server.broadcast('notification_channel', content: '您有新訊息')
  end

  private
  def message_params
    params.require(:message).permit(:content, :room_id)
  end
end
