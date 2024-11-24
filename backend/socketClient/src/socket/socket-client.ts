import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from "socket.io-client";

@Injectable()
export class SocketClient implements OnModuleInit {

    public socketClient: Socket; // Represents the client socket instance.

    constructor() {
        // Initializes the client socket and connects it to the WebSocket gateway running on port 3000.
        this.socketClient = io('http://localhost:3000');
    }

    onModuleInit() {
        // Lifecycle hook triggered when the module is initialized.
        // Registers event listeners for the socket client.
        this.registerConsumerEvents();
    }

    private registerConsumerEvents() {
        // Sets up event listeners for the client socket.

        this.socketClient.on('connect', () => {
            // Logs a message when the client successfully connects to the WebSocket gateway.
            console.log('Client socket connected to Gateway');
        });

        // Uncomment this block to emit a 'newMessage' event to the gateway with a sample payload.
        // this.socketClient.emit('newMessage', {
        //     msg: 'New Message', // Static message
        //     content: 'Hi There!' // Example content
        // });

        this.socketClient.on('onMessage', (payload: any) => {
            // Listens for 'onMessage' events emitted by the WebSocket gateway.
            console.log('SocketClientClass!!');
            console.log(payload);
        });
    }
}
