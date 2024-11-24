
import { socket, WebsocketProvider } from './contexts/WebsocketContext'
import WebsocketComponent from './components/WebsocketComponent'

function App() {

  return (
    <>
      <WebsocketProvider value={socket}>
        <WebsocketComponent />
      </WebsocketProvider>
    </>
  )
}

export default App
