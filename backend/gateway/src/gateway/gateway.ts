import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'


@WebSocketGateway({
    cors: {
        origin: ['http://localhost:5173']  //// To access with frontend
    }
}) // This decorator indicates that this class is a WebSocket gateway. It uses a default port (e.g., 3000 in NestJS).

//@WebSocketGateway(80) // Uncomment to change the WebSocket gateway to a custom port, such as 80.

export class MyGateway implements OnModuleInit {

    // To send messages from the gateway back to the client
    @WebSocketServer()
    server: Server; // This property represents the WebSocket server instance (Socket.IO server).


    // This lifecycle method is triggered when the module is initialized.
    onModuleInit() {
        // It sets up an event listener for client connections.
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
        });
    }

    // The gateway is now listening for events with the name 'newMessage'.
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
        // This method is triggered when a 'newMessage' event is received.

        this.server.emit('onMessage', {
            // Emits an 'onMessage' event back to all connected clients with the following data:
            msg: 'New Message',
            content: body,
            id: client.id
        });
    }

    @SubscribeMessage("privateMessage")
    onPrivateMessage(
      @MessageBody() data: { to: string; message: string },
      @ConnectedSocket() client: Socket
    ) {
      const { to, message } = data;
      const targetSocket = this.server.sockets.sockets.get(to);
  
      if (!targetSocket) {
        client.emit("errorMessage", { error: "Recipient not found." });
        return;
      }
  
      // Emit private message to the recipient
      targetSocket.emit("privateOnMessage", {
        msg: "Private Message",
        content: message,
        senderId: client.id,
        receiverId: to,
      });
  
      // Optionally, notify the sender that the message was sent
      client.emit("privateOnMessage", {
        msg: "Private Message Sent",
        content: message,
        senderId: client.id,
        receiverId: to,
      });
    }
}
