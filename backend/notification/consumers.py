import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.connect()

    async def disconnect(self, code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']

        await self.send(text_data=json.dumps({
            'message':message
        }))

    async def notify_login(self,event):
        await self.send(text_data=json.dumps({
            'message':event['message']
        }))

    async def notify_registration(self,event):
        await self.send(text_data=json.dumps({
            'message':event['message']
        }))

    async def notify_logout(self,event):
        await self.send(text_data=json.dumps({
            'message':event['message']
        }))