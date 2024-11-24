import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'

@WebSocketGateway() // This decorator indicates that this class is a WebSocket gateway. It uses a default port (e.g., 3000 in NestJS).
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
    onNewMessage(@MessageBody() body: any) {
        // This method is triggered when a 'newMessage' event is received.

        this.server.emit('onMessage', {
            // Emits an 'onMessage' event back to all connected clients with the following data:
            msg: 'New Message',
            content: body
        });
    }
}
