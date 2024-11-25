import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";

interface MessagePayload {
  content: string;
  msg: string;
  id: string; // Sender ID
}

interface PrivateMessagePayload {
  content: string;
  msg: string;
  senderId: string;
  receiverId: string;
}

const WebsocketComponent = () => {
  const socket = useContext(WebsocketContext);
  const [value, setValue] = useState("");
  const [privateValue, setPrivateValue] = useState("");
  const [toId, setToId] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [privateMessages, setPrivateMessages] = useState<PrivateMessagePayload[]>([]);
  const [socketId, setSocketId] = useState<string | undefined>("");


  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected From React!");
      setSocketId(socket.id)
    });

    socket.on("onMessage", (data: MessagePayload) => {
      console.log("Broadcast Message:", data);
      setMessages((prev) => [...prev, data]);
    });

    socket.on("privateOnMessage", (data: PrivateMessagePayload) => {
      console.log("Private Message:", data);
      setPrivateMessages((prev) => [...prev, data]);
    });

    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
      socket.off("privateOnMessage");
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("newMessage", value);
    setValue("");
  };

  const handleSendPrivateMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!toId || !privateValue) {
      console.error("Recipient ID and message are required.");
      return;
    }
    socket.emit("privateMessage", {
      to: toId,
      message: privateValue,
    });
    setPrivateValue("");
    setToId("");
  };

  return (
    <div className="w-screen py-[100px] min-h-screen flex flex-col items-center bg-neutral-900 text-white">
      {/* Header */}
      <h1 className="sm:text-4xl text-3xl font-bold mb-8">WebSocket Messenger</h1>

      {/* Display User Socket ID */}
      <div className="w-[360px] text-center bg-gray-800 p-4 rounded shadow-md">
        <p className="text-sm text-gray-400">
          <strong>Your Socket ID:</strong>
        </p>
        <p className="text-blue-400 break-words">{socketId}</p>
      </div>

      {/* Broadcast Messages Section */}
      <section className="w-[360px] mt-6">
        <h2 className="text-xl font-semibold mb-4">Broadcast Messages</h2>
        {messages.length === 0 ? (
          <p className="text-gray-400">No Broadcast Messages</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded shadow-md">
                <p className="text-sm text-gray-400">
                  <strong>Sender:</strong> {message.id}
                </p>
                <p className="mt-1">{message.content}</p>
              </div>
            ))}
          </div>
        )}
        {/* Broadcast Message Form */}
        <form onSubmit={handleSendMessage} className="flex gap-2 mt-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 bg-gray-700 p-2 rounded focus:outline-none text-white placeholder-gray-400"
            placeholder="Type a broadcast message"
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition duration-200 shadow"
          >
            Send
          </button>
        </form>
      </section>

      {/* Divider */}
      <hr className="my-8 border-gray-700 w-full" />

      {/* Private Messages Section */}
      <section className="w-[360px]">
        <h2 className="text-xl font-semibold mb-4">Private Messages</h2>
        <div className="space-y-4">
          {privateMessages.length === 0 ? (
            <p className="text-gray-400">No Private Messages</p>
          ) : (
            privateMessages.map((privateMessage, index) => (
              <div
                key={index}
                className={`p-3 rounded shadow-md w-3/4 ${privateMessage.senderId === socketId
                    ? "bg-blue-600 text-white self-end ml-auto"
                    : "bg-gray-800 text-white self-start mr-auto"
                  }`}
              >
                <p className="text-sm">
                  <strong>
                    {privateMessage.senderId === socketId ? "You" : `From: ${privateMessage.senderId}`}
                  </strong>
                </p>
                <p className="mt-1">{privateMessage.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Private Message Form */}
        <form
          onSubmit={handleSendPrivateMessage}
          className="flex flex-col gap-2 mt-4"
        >
          <input
            type="text"
            value={toId}
            onChange={(e) => setToId(e.target.value)}
            className="bg-gray-700 p-2 rounded focus:outline-none text-white placeholder-gray-400"
            placeholder="Recipient ID"
          />
          <input
            type="text"
            value={privateValue}
            onChange={(e) => setPrivateValue(e.target.value)}
            className="bg-gray-700 p-2 rounded focus:outline-none text-white placeholder-gray-400"
            placeholder="Type a private message"
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition duration-200 shadow"
          >
            Send Private Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default WebsocketComponent;
