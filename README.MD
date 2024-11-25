# WebSocket Project with NestJS and React

This project demonstrates a WebSocket-based real-time communication system using **NestJS** for the backend and **React** for the frontend.

## Overview

1. **Gateway Server**: A WebSocket server created using **NestJS** to handle real-time communication.
2. **Socket Client Server**: A client server using **NestJS** to simulate and test WebSocket functionality.
3. **Frontend**: A **React** application to interact with the WebSocket server for real-time messaging.

## Preview

### Broadcast Messages
A message sent is instantly displayed to all connected clients.

![Broadcast Messages Preview](./images/Boadcast%20Messages.png)


### Private Messages
Messages exchanged privately between two users.

![Private Messages Preview](./images/Private%20Messages.png)

---

## Features

- **Broadcast Messaging**: Send messages to all connected clients.
- **Private Messaging**: Exchange messages between two clients securely.
- **Real-Time Communication**: Messages are delivered instantly with Socket.IO.
- **User-Friendly UI**: Built using React for seamless user interaction.

---

## Project Structure

```plaintext
├── backend/
│   ├── gateway/          # WebSocket Gateway (NestJS)
│   ├── socketClient/     # Socket Client for testing (NestJS)
├── frontend/             # Frontend Application (React)
```

## Setup Instructions

### Prerequisites
- Node.js
- npm or yarn
- NestJS (for backend)
- React (for frontend)

### Setting Up the Gateway Server (Backend)

- Navigate to the Gateway server folder:

```bash
cd backend/gateway
```

- Install dependencies:

```bash
npm install
```

- Run the server:

```bash
npm run start
```
The Gateway server will start at http://localhost:3000

### Setting Up the Socket Client Server (Backend)

- Navigate to the Socket Client server folder:

```bash
cd backend/socketClient
```

- Install dependencies:

```bash
npm install
```

- Run the server:

```bash
npm run start
```
The Gateway server will start at http://localhost:3001
This will simulate a WebSocket client to interact with the Gateway server.

### Setting Up the Frontend (React)

- Navigate to the frontend folder:

```bash
cd frontend
```

- Install dependencies:

```bash
npm install
```

- Run the server:

```bash
npm run dev
```
The frontend will start at http://localhost:5173.


## Usage

### Broadcast Messages

1. Open the React frontend.
2. Enter a message in the Broadcast Message input field.
3. Submit the message to broadcast it to all connected clients.
4. View the broadcast message in real-time on all connected instances.

### Private Messages

1. Enter the Recipient's ID (socket ID).
2. Type the private message in the Private Message input field.
3. Submit the private message to send it directly to the specified client.


## Code Highlights
### Backend: WebSocket Gateway (NestJS)

- Broadcast Messages: Handled using **this.server.emit**.
- Private Messages: Sent directly using **this.server.to(targetSocketId).emit**.


### Frontend: React

State Management: **useState** for messages and socket IDs.
Real-Time Updates: **useEffect** hooks to manage WebSocket listeners.

## Technologies Used

- Backend: NestJS, Socket.IO
- Frontend: React, TailwindCSS
- WebSocket Protocol: Real-time communication


## Future Enhancements

- Authentication for secure communication.
- User management and persistent chat history.
- UI improvements with better styling and animations.

## Feedback

Feel free to open issues or pull requests to contribute to the project or suggest improvements!
```
This `README.md` is structured to provide clear and detailed instructions for anyone setting up and using the project.
```