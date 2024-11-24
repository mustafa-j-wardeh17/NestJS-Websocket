import { useContext, useEffect, useState } from "react"
import { WebsocketContext } from "../contexts/WebsocketContext"

type MessagePayload = {
  content: string;
  msg: string;
  id: string;
}
const WebsocketComponent = () => {
  const socket = useContext(WebsocketContext);
  const [value, setValue] = useState('')
  const [messages, setMessages] = useState<MessagePayload[]>([])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected From React!')
    })

    socket.on('onMessage', (data: MessagePayload) => {
      console.log(data)
      setMessages(prev => [...prev, data])
    })

    return () => {
      console.log('Unregistering Events...')
      socket.off('connect');
      socket.off('onMessage')
    }
  }, [socket])

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    socket.emit('newMessage', value)
    setValue('')
  }
  return (
    <div className="w-screen h-screen flex text-white flex-col gap-4 bg-neutral-900 items-center justify-center">
      <h1 className="sm:text-4xl text-3xl font-bold">Websocket Component</h1>
      {messages.length === 0 ? (
        <p className="w-[360px]">No Messages</p>
      ) : (
        <div className="w-[360px]">
          {messages.map((message, index) => (
            <div key={index}>
              <p>{message.id}</p>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      )}
      <form
        onSubmit={handleSendMessage}
        className="flex gap-4 w-[360px]"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-transparent rounded-md px-2 py-1 focus:outline-none border w-full"
        />
        <button
          type="submit"
          className="bg-neutral-600 px-3 py-1 rounded-md hover:bg-neutral-400 duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default WebsocketComponent