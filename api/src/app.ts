import bodyParser from "body-parser"
import cors from "cors"
import { config } from "dotenv"
import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { createServer } from 'http'
import createHttpError from "http-errors"
import { Server as SocketIOServer } from 'socket.io'
import connectDB from "./config/connectDB"
import { initSocketIO } from "./config/socketIO"
import initWebRoutes from "./routes/web"

config()

const app: Application = express()

// Enable CORS
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect Routes
initWebRoutes(app)

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound())
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message,
  })
}

app.use(errorHandler)

connectDB()

const PORT: number = Number(process.env.PORT) || 9696

const server = createServer(app)
const io: SocketIOServer = initSocketIO(server)
app.set('socketio', io)

// io.on('connection', (socket) => {
//   console.log('A client connected')

//   socket.on('message', (message) => {
//     console.log('Received message:', message)

//     // Gửi lại tin nhắn cho tất cả các client khác
//     socket.broadcast.emit('message', message)
//   })

//   socket.on('disconnect', () => {
//     console.log('A client disconnected')
//   })
// })


server.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`)
})
