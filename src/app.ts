/* eslint-disable @typescript-eslint/no-base-to-string */
import { WebSocketServer, WebSocket } from 'ws'

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', function connection (ws) {
  console.log('Client connected')

  ws.on('error', console.error)

  ws.on('message', function message (data) {
    console.log('desde el cliente', data.toString())

    const payload = {
      type: 'custom-message',
      payload: data.toString()
    }
    // ws.send(JSON.stringify(payload))

    wss.clients.forEach(function each (client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload), { binary: false })
      }
    })
  })

  ws.on('close', () => {
    console.log('client disconnected')
  })

  // ws.send('Hola desde el servidor!!')
})

console.log('Server running on port http://localhost:3000')
