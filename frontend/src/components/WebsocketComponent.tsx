import { useContext, useEffect } from "react"
import { WebsocketContext } from "../contexts/WebsocketContext"

const WebsocketComponent = () => {
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected From React!')
    })
    socket.on('onMessage', (data) => {
      console.log(data)
    })

    return () => {
      console.log('Unregistering Events...')
      socket.off('connect');
      socket.off('onMessage')
    }
  }, [])
  return (
    <div>WebsocketComponent</div>
  )
}

export default WebsocketComponent