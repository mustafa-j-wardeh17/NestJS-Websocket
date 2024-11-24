import { useContext, useEffect } from "react"
import { WebsocketContext } from "../contexts/WebsocketContext"

const WebsocketComponent = () => {
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on('onMessage', (data) => {
      console.log(data)
    })
  }, [])
  return (
    <div>WebsocketComponent</div>
  )
}

export default WebsocketComponent