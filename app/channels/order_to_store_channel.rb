class OrderToStoreChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "order_to_store_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
