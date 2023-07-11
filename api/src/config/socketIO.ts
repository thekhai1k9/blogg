import { Socket, Server as SocketIOServer } from 'socket.io'

export const initSocketIO = (server: any) => {
    const io: SocketIOServer = require('socket.io')(server)
  
    io.on('connection', (socket: Socket) => {
      console.log('A client connected')
  
      socket.on('disconnect', () => {
        console.log('A client disconnected')
      })
    })
  
    return io
}