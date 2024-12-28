import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 3000 })

wss.on('connection', function connection (ws) {
  console.log('Client connected')

  ws.on('error', console.error)

  ws.on('message', function message (data) {
    console.log('received: %s', data)
  })

  ws.on('close', () => {
    console.log('client disconnected')
  })

  ws.send('Hola desde el servidor!!')
})

console.log('Server running on port http://localhost:3000')
