from django.dispatch import Signal
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

login_notification = Signal()
registration_notification = Signal()
logout_notification = Signal()

def send_notification(message, signal):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notifications",
        {
            "type": signal,
            "message": message
        }
    )