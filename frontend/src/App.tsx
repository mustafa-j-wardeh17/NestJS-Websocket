
import { socket, WebsocketProvider } from './contexts/WebsocketContext'
import WebsocketComponent from './components/WebsocketComponent'

function App() {

  return (
    <>
      <WebsocketProvider value={socket}>
        <div className='max-w-screen  min-h-screen overflow-hidden'>
          <WebsocketComponent />
        </div>
      </WebsocketProvider>
    </>
  )
}

export default App
